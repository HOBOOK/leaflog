const jwt = require('jsonwebtoken');
const config = require('config');
const SECRET_KEY = config.get('secretKey');
const verifyToken = (req, res, next) => {
try {
const clientToken = req.cookies.user;
const decoded = jwt.verify(clientToken, SECRET_KEY);
if (decoded) {
res.locals.userId = decoded.user_id;
next();
} else {
res.status(401).json({ error: 'unauthorized' });
}
} catch (err) {
res.status(401).json({ error: 'token expired' });
}
};
exports.verifyToken = verifyToken;