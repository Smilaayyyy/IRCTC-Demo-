function adminMiddleware(req, res, next) {
    console.log('User from request:', req.user);

    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
}

module.exports = adminMiddleware;
