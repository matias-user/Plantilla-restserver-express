const { getUsers
    ,updateUser
    ,deleteUser
    ,createUser } = require('./user');

const { login } = require('./auth');

    
module.exports = {
    getUsers,
    updateUser,
    deleteUser,
    createUser,
    login
}