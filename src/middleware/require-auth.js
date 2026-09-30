function requireAuth(req, res, next) {
  if (!req.session.userId) {
    res.redirect('/login');
    return;
  }

  next();
}

module.exports = requireAuth;
