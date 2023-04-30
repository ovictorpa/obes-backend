const getUsers = "SELECT * FROM OBES.USER"
const getUserById = "SELECT * FROM OBES.USER WHERE ID = $1"
const createCommonUser = "INSERT INTO OBES.USER (NAME, EMAIL, PASSWORD) VALUES ($1, $2, $3)"
const createInstitutionalUser = "INSERT INTO OBES.USER (NAME, EMAIL, PASSWORD, INSTITUTION_TYPE) VALUES ($1, $2, $3, $4)"
const deleteUser = "DELETE FROM OBES.USER WHERE ID = $1"
const updateUserName = "UPDATE OBES.USER SET NAME = $1 WHERE ID = $2"
const updateUserEmail = "UPDATE OBES.USER SET EMAIL = $1 WHERE ID = $2"
const updateUserPassword = "UPDATE OBSER.USER SET PASSWORD = $1 WHERE ID = $2"
const getUserByEmail = "SELECT * FROM OBES.USER WHERE EMAIL = $1 AND PASSWORD = $2"

module.exports = {
    getUserById,
    getUsers,
    createCommonUser,
    createInstitutionalUser,
    deleteUser,
    updateUserEmail,
    updateUserName,
    updateUserPassword,
    getUserByEmail
}