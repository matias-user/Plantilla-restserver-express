const { response, request } = require('express');

const getUser = (req, res = response) => {
    res.json('getUser');
    
};

const updateUser = (req = request, res = response) => {
    const querys = req.query;
    const params = req.params;
    res.json( params, querys );
};

const deleteUser = (req, res = response) => {
    res.json('delete user');
};

const createUser = (req = request, res = response) => {
    const { name } = req.body;
    res.json({
        name
    });
};

module.exports = {
    getUser,
    updateUser,
    deleteUser,
    createUser
}