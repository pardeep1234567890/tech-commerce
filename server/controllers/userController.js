import User from '../models/UserModel.js';
import generateToken from '../utils/generateToken.js';

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