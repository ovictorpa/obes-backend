const pool = require('../../database')
const query = require('../query/users-query')

class UsersController {

    getAllUsers(req, res) {
        pool.query(query.getUsers, (error, results) => {
            if(error) {return res.status(500).send({error: error})}
            res.status(200).json(results.rows);
        })
    }
    getUserById(req, res) {
        const id = parseInt(req.params.id);
        pool.query(query.getUserById, [id], (error, results) => {
            if (error) {return res.status(500).send({error: error})}
            res.status(200).json(results.rows);
        })
    }
    createUser(req, res) {
        const {name, email, password, institution_type} = req.body;
        if(!institution_type) {
            pool.query(query.createCommonUser, [name, email, password], (error, results) => {
                if(error) {return res.status(500).send({error: error})}
                const response = {
                    message: "Usuário Comum cadastrado com sucesso",
                    commonUser : {
                        name: name,
                        email: email
                    }
                }
                res.status(201).send({response: response });
            })
        }
        else{
            pool.query(query.createInstitutionalUser, [name, email, password, institution_type], (error, results) => {
                if(error) {return res.status(500).send({error: error})}
                const response = {
                    message: "Usuário Institucional cadastrado com sucesso",
                    commonUser : {
                        name: name,
                        email: email,
                        type: institution_type
                    }
                }
                res.status(201).send({response: response})
            })
        }
    }
    updateUser(req, res) {
        const id = parseInt(req.params.id);
        const {name, email, password} = req.body;
        if(name)
            pool.query(query.updateUserName, [name, id], (error, results) => {
                if(error) throw error;
            })
        if(email)
            pool.query(query.updateUserEmail, [email, id], (error, results) => {
                if(error) throw error;
            })
        if(password)
            pool.query(query.updateUserPassword, [password, id], (error, results) => {
                if(error) throw error;
            })
        if(name || email || password)
            res.status(200).send("Informations Updated Successfully")
    }
    deleteUser(req, res) {
        const id = parseInt(req.params.id);
        pool.query(query.deleteUser, [id], (error, results) =>{
            if(error) throw error;
            res.status(200).send("User Deleted Successfully!");
        })
    }

}
module.exports= new UsersController();