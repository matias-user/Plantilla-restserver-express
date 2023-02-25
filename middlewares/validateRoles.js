const jwt = require('jsonwebtoken');
const User = require("../models/User");


const isRoleAdmin = async(req, res, next) => {

    if( !req.user ) return res.status(500).json({
        msg:'Se quiere validar sin tener un token valido'
    });

    const { role, name } = req.user;
    if( role !== 'ADMIN_ROLE' ) return res.status(401).json({msg:'Usuario no puede realizar esta acción, debe ser administrador.'})

    next();

};

const hasRole = ( ...roles ) => {
    return (req, res, next) => {
        if( !req.user ) return res.status(500).json({
            msg:'Se quiere validar sin tener un token valido'
        });

        const { role } = req.user;
        if( !roles.includes(role) ) return res.status(401).json({
            msg: `Usuario debe tener los siguientes roles para esta acción: ${roles}`
        });        

        next();
    }
};

module.exports ={ 
    isRoleAdmin,
    hasRole
};