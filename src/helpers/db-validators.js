const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async(role = '') => {
    const hasRole = await Role.findOne({ role });
    if ( !hasRole ) { 
        throw new Error(`El role ${role} no está registrado en la BD`);
    }
};

const emailExists = async(email = '') => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`El correo ${email} ya esta registrado`)
    }
};

const userExists = async(id) => {
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error(`El id no existe ${id}`)
    }
};

module.exports = {
    isRoleValid,
    emailExists,
    userExists
};
