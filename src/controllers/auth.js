const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async( req, res = response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user){
        res.status(400).json({
            msg: 'Usuario o passoword no son correctos'
        });
    };

    if(!user.status){
        res.status(400).json({
            msg: 'Usuario no esta activo'
        });
    };

    const validPassword = bcryptjs.compareSync(password, user.password);

    const token = await generateJWT(user.id);

    if(!validPassword){
        res.status(400).json({
            msg: 'Password no es correcta'
        });
    };

    try {
        res.json({
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Algo salio mal'
        })
    };
};

module.exports = {
    login
};
