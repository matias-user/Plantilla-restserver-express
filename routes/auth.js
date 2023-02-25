const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers');
const { validateErrors } = require('../middlewares/validationErrors');

const router = Router();

router.get('/login',[
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validateErrors
], login );

module.exports = router;