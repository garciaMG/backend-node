const validateParams = require('../middleware/validate-params');
const validateJWT = require('../middleware/validate-jwt');
const validateRole = require('../middleware/validate-role');

module.exports = {
    ...validateParams,
    ...validateJWT,
    ...validateRole
}
