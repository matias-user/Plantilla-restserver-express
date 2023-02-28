const { getUsers
    ,updateUser
    ,deleteUser
    ,createUser } = require('./user');

const { login, googleSignIn } = require('./auth');

    
module.exports = {
    getUsers,
    updateUser,
    deleteUser,
    createUser,
    login,
    googleSignIn
}