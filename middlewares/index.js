const { validateErrors } = require('../middlewares/validationErrors');
const validateJWT = require('../middlewares/validateJWT');
const { isRoleAdmin, hasRole } = require('../middlewares/validateRoles');

module.exports = {
    validateErrors,
    validateJWT,
    isRoleAdmin,
    hasRole
}