const { response } = require("express");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateJWT = require("../helpers/generate-jwt");

const login = async( req, res = response) => {

    const { email, password } = req.body;

    try {
        // Verificar si el email existe
        const user = await User.findOne({email});
        if( !user ) return res.status(400).json({msg: `Correo o contraseña no son correctos.` })

        // Si el usuario esta activo
        if( !user.state ) res.status(400).json({msg:'Correo o contraseña no son correctos.'});

        // Verificar la contraseña
        if( !bcrypt.compareSync( password, user.password )) res.status(400).json({msg:'Correo o contraseña no son correctos.'});
            
        
        // Generar el JWT
        const token = await generateJWT( user._id );

        res.json({
            user,
            token
        }); 

    } catch (error) {
        console.log(error);
        res.status( 500 ).json({msg: 'Algo salió mal'})
    }


};


module.exports = {
    login
}