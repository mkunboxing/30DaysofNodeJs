const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // this line is important for testing in postman
    const token = req.headers.authorization.split(' ')[1];  

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, 'mycode', (error, user) => {
        if (error) {
            return res.status(403).json({ message: "Token is wrong" });
        }
        req.user = user;
        next();
    });
}
function authorizeRole(allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden you are not allowed" });
        }
        next();
    }
}
module.exports = { authenticateToken, authorizeRole };