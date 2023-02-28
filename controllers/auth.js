const { response } = require("express");
const bcrypt = require('bcrypt');


const User = require('../models/User');
const generateJWT = require("../helpers/generate-jwt");
const googleVerify = require("../helpers/google-verify");

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
const googleSignIn = async(req, res) => {

    const { id_token } = req.body;
    try {
        const { name, email, image } = await googleVerify( id_token );

        let user = await User.findOne({email});

        if( !user ){
            const data = {
                name,
                email,
                image,
                password:'Cualquier cosa 123',
                role:'USER_ROLE',
                google: true

            }
            user = new User(data);
            await user.save();
        }
        if( !user.state ){
            return res.status(401).json({msg:'Usuario bloqueado o eliminado.'})
        }
        const token = await generateJWT( user._id );

        res.status(200).json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({msg:'El token no se pudo verificar.'});
    }

};

module.exports = {
    login,
    googleSignIn
}