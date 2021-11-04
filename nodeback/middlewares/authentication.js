const User = require('../models/user');
const tokenHelpers = require('../helpers/tokenhelper');

module.exports = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        const payload = await tokenHelpers.verify(token);
        const userId = payload.userId;
        req.user = await User.findById(userId);
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({message: 'authentication failed'});
    }
}