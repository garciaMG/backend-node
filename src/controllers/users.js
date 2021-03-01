const { response, Router } = require('express');
const router = Router();

const getUsers = (req, res = response) => {
    res.json('Users')
};

const createUsers = (req, res = response) => {
    const body = req.body;
    res.json(body)
};

const updateUsers = (req, res = response) => {
    res.json('Users')
};

const deleteUsers = (req, res = response) => {
    res.json('Users')
};

module.exports = {
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers
};
