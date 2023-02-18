const { response, request } = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');


const getUsers = async(req, res = response) => {
    
    const { desde = 0, limite = 10 } = req.query;
    const query = {state:true};

    // const users = await User.find(query)
    //     .skip( desde )
    //     .limit(limite);
    // const total = await User.countDocuments(query);

    const [ users, total ] = await Promise.all([
        User.find(query)
        .skip( desde )
        .limit(limite),
        User.countDocuments(query)
    ]);
    const quantity = users.length;

    res.json({
        quantity,
        total,
        users
    });
    
};

const updateUser = async(req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    
    if( password ){
        const encryptPassword = bcrypt.hashSync(password, 10);
        rest.password = encryptPassword;
        
    }
    const user = await User.findByIdAndUpdate( id, rest );
    
    res.status(200).json( {id} );
};

const deleteUser = async(req, res = response) => {
    const { id } = req.params;
    await User.findByIdAndUpdate( id, {state:false});

    res.status(200).json({
        id
    })
};

const createUser = async(req = request, res = response, next) => {

    const { name, email, password, role } = req.body;

    const user = new User({
        name, 
        email, 
        password, 
        role
    });
    const existUser = await User.findOne({email});

    if( existUser ){
        return res.status(400).json({
            msg:`Correo [${email}] ingresado ya existe `
        });
    }

    // hash pass

    
    await user.save();

    res.status(201).json({
        user        
    });
    
};

module.exports = {
    getUsers,
    updateUser,
    deleteUser,
    createUser
}