const { request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const validateJWT = async(req = request, res, next) => {
    const token = req.header('x-token');
    if( !token ) return res.status(401).json({msg:'No hay token en la petición.'})

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRET_KEY );
        const user = await User.findById( uid );
        if( !user ) return res.status(400).json({msg:'Token inválido.'});

        if( !user.state ) return res.status(401).json({msg:'Token inválido.'});

        // Grabar en la request
        req.user = user;


        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({msg:'Token inválido.'});
    }

};

module.exports = validateJWT;