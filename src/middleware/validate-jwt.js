const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req, res = response, next) => {
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    };

    try {
        const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);
        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: 'Usuario no existe'
            });
        }

        if(!user.status){
            return res.status(401).json({
                msg: 'Usuario con estado false'
            });
        }

        req.user = user;
        next();
    } catch(error) {
        return res.status(401).json({
            msg: 'Token no válido'
        });
    };
};

module.exports = {
    validateJWT
};
