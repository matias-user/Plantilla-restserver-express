const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {
    const payload = { uid };

    return new Promise( (res, rej) => {
        jwt.sign( payload, process.env.SECRET_KEY, {
            expiresIn: '4h'
        }, ( (err, token) =>{
            if( err ){
                console.log(err);
                rej('No se pudo generar el JWT')
            }else{
                res( token );
            }
        } ) ); 
    } );
};


module.exports = generateJWT;