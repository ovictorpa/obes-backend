const jwt = require('jsonwebtoken')
const User = require("../app/models/User")

module.exports = async (req, res, next) => {


    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            message: 'Login Required'
        })
    }

    const [, token] = authorization.split(' ')

    try {
        const decode = jwt.verify(token, process.env.TOKEN_SECRET);

        const { id, email } = decode

        const user = await User.findOne({
            where: {
                id,
                email,
            },
        });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid User',
            });
        }

        req.user = { id, email }

        return next();


    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}