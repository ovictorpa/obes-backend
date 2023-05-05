const jwt = require('jsonwebtoken')
const jwtkey = require('../../nodemon.json')
const User = require("../app/models/User")

module.exports = async (req, res, next) => {

    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.json(401).json({
                errors: ['Login Required']
            })
        }

        const [, token] = authorization.split(' ')


        const decode = jwt.verify(token, process.env.TOKEN_SECRET);

        const { id, email } = decode

        const user = await User.findOne({
            where: {
                id,
                email,
            },
        });

        if (!user) {
            return response.status(401).json({
                errors: ['Invalid User'],
            });
        }

        req.user = { id, email }

        return next();


    } catch (error) {
        return res.status(401).send({ message: "Unauthorized" })
    }
}