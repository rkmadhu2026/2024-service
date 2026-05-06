const DEMO_JWT = 'mock-jwt-token-12345';

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [type, token] = header.split(/\s+/);
  if (type !== 'Bearer' || !token || token !== DEMO_JWT) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
}

module.exports = { requireAuth, DEMO_JWT };
