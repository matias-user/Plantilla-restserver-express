const { Router } = require('express');
const { getUsers, updateUser, deleteUser, createUser } = require('../controllers');
const { check } = require('express-validator');
const { isValidateRole, existEmail, existUserById } = require('../helpers/db-validators');
const { validateErrors, hasRole, isRoleAdmin, validateJWT  } = require('../middlewares');

const router = Router();

router.get('/', getUsers);

router.put('/:id',[
    check('id','El id enviado no es válido').isMongoId(),
    check('id').custom( existUserById ),
    check('role').custom( isValidateRole ),
    validateErrors
],updateUser);

router.post('/',[
    check( 'email', 'Formato de correo no es valido' ).isEmail(),
    check('email','El correo es obligatorio').not().isEmpty(),
    check('email').custom( existEmail ),
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser mayor a 6 letras').isLength({min :6}),
    check('role','El rol es obligatorio').not().isEmpty(),
    check('role').custom( isValidateRole ),
    // No es dinamico
    // check('role','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validateErrors
],createUser);

router.delete('/:id',[
    validateJWT,
    check('id','El id enviado no es valido').isMongoId(),
    check('id').custom( existUserById ),
    // isRoleAdmin,
    hasRole('ADMIN_ROLE','VENTAS_ROLE'),
    validateErrors
],deleteUser);


module.exports = router;