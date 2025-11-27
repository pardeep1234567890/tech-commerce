const isAdmin = (req, res, next) => {
  // This middleware relies on the 'protect' middleware running BEFORE it.
  // 'protect' finds the user and attaches it to req.user
  if (req.user && req.user.isAdmin) {
    next(); // User is an admin, proceed to the controller
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { isAdmin };