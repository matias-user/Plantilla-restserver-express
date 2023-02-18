const Role = require('../models/Role');
const User = require('../models/User');

const isValidateRole = async( role = '' ) => {
    
    const existRole = await Role.findOne({role});
    if( !existRole ) throw new Error('El rol no existe.');
}


const existEmail = async( email ) => {
    
    const existEmail = await User.findOne({email});
    if( existEmail ) throw new Error(`Correo: ${email} ya existe`)
}

const existUserById = async( id ) => {

    const existUser = await User.findById(id);
    console.log(existUser);
    if( !existUser ) throw new Error(`El usuario con id: ${id} no existe`);
}

module.exports = {
    isValidateRole,
    existEmail,
    existUserById
}