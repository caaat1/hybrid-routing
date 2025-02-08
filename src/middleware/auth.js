// src/middleware/auth.js
export default function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  return res.redirect('/login');
}
