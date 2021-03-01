const { Router } = require('express');
const { getUsers, createUsers, deleteUsers, updateUsers } = require('../controllers/users');
const router = Router();

router.get('/', getUsers);

router.post('/', createUsers);

router.put('/:id', updateUsers);

router.delete('/', deleteUsers);

module.exports = router;
