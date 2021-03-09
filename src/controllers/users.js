const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const getUsers = async(req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [users, totalRecords] = await Promise.all([
        User.find(query)
            .limit(Number(limit))
            .skip(Number(from)),
        User.countDocuments(query)
    ]);

    res.json({ totalRecords, users });
};

const createUsers = async (req, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await user.save();
    res.json(user);
};

const updateUsers = async(req, res = response) => {
    const { id } = req.params;
    const  { _id, password, google, ...params } = req.body;

    if(password){
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        params.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, params);

    res.json({
        msg: 'put API - usuario update',
        id
    });
};

const deleteUsers = async(req, res = response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { status: false});

    res.json({ user });
};

module.exports = {
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers
};
