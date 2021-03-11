const { Router } = require('express');
const { check } = require('express-validator'); 

const {
    validateParams,
    validateJWT,
    isAdmin
} = require('../middleware/index');

const { isRoleValid, emailExists, userExists } = require('../helpers/db-validators');
const { getUsers, createUsers, deleteUsers, updateUsers } = require('../controllers/users');
const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('email', 'Correo no es válida').isEmail(),
    check('email').custom(emailExists),
    check('role').custom(isRoleValid),
    validateParams
],createUsers);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(userExists),
    check('role').custom(isRoleValid),
    validateParams
], updateUsers);

router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(userExists),
    validateParams
], deleteUsers);

module.exports = router;
