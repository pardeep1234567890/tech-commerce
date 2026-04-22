import User from '../models/UserModel.js';
import generateToken from '../utils/generateToken.js';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // FIX 1: Find by email only
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return; // Stop execution
  }

  // FIX 2: Pass 'password' from req.body
  const user = await User.create({
    name,
    email,
    password, // The 'pre' hook in your model will hash this
  });

  if (user) {
    // FIX 3: Declare 'token'
    const token = generateToken(user._id);

    // FIX 4: Send a single JSON object with only the data we need
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // FIX 5: We must CALL and AWAIT the matchPassword function
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    // FIX 6: Send a single JSON object
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  } else {
    // FIX 7: Use 401 Unauthorized for bad logins
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Google Login — verify ID token and find-or-create user
export const googleLogin = async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: 'Google credential is required' });
  }

  try {
    // Verify the Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // 1. Try to find user by googleId
    let user = await User.findOne({ googleId });

    // 2. If not found by googleId, check by email (account linking)
    if (!user) {
      user = await User.findOne({ email });

      if (user) {
        // Link existing email/password account with Google
        user.googleId = googleId;
        if (picture && !user.avatar) {
          user.avatar = picture;
        }
        await user.save();
      }
    }

    // 3. If still no user, create a brand new one
    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture,
      });
    }

    // Return the same shape as normal login
    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      token,
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(401).json({ message: 'Invalid Google credential' });
  }
};
export const toggleWishlist = async (req, res) => {
  // Get the product id from request body 
  const { productId } = req.body;
  // get the user 
  const user = await User.findById(req.user._id);
  //if not user then send error
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  // Check if the product is *already* in the wishlist
  const index = user.wishlist.indexOf(productId)
  // If it IS in the list (index is not -1), remove it
  if (index > -1) {
    user.wishlist.pull(productId);
    // user.wishlist.splice(index, 1);
  } else {
    user.wishlist.push(productId);
  }
  await user.save();
  res.status(200).json({ wishlist: user.wishlist });
}

export const getMyWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist'); 

  if (user) {
    res.json(user.wishlist);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};