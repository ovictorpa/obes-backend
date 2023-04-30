const pool = require('../../database')
const query = require('../query/users-query')
const jwt = require("jsonwebtoken")
const jwtkey = require('../../../nodemon.json')

class LoginController {

    newLogin(req, res) {
        const {email, password} = req.body;
        pool.query(query.getUserByEmail, [email, password], (error, results) => {
            if(error) {return res.status(500).send({error: error})}
            if(results.rows.length < 1) { return res.status(401).send({messsage: "Falha na autenticação"});}
            else {
                const token = jwt.sign({
                    id: results.rows[0].id,
                    email: results.rows[0].email,
                }, jwtkey.env.JWT_KEY, {
                    expiresIn: "1h"
                })
                const response = {
                    message: "Usuário Logado",
                    user : {
                        email: email,
                        token: token
                    }
                }
                return res.status(201).send({response: response });
            }
        })
    }
}

module.exports = new LoginController();