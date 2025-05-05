const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
    let token = req.headers('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7).trim();
    }


    try {
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = verifyToken;