const jwt = require('jsonwebtoken')
const jwtkey = require('../../nodemon.json')

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, jwtkey.env.JWT_KEY,)
        req.user = decode
        next();
    } catch (error) {
        return res.status(401).send({menssage : "Unauthorized"})
    }
}