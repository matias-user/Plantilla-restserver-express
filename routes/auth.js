const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers');
const { validateErrors } = require('../middlewares/validationErrors');

const router = Router();

router.post('/login',[
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validateErrors
], login );

router.post('/google',[
    check('id_token','Se requiere token de google').not().isEmpty(),
    validateErrors
], googleSignIn);

module.exports = router;