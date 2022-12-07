// se llama auth porque las rutas tienen que ver con autenticaciones

const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');

// Importando los controladores
const { createUser, loginUser, renewToken } = require('../controllers/auth.controller');
const { fieldsValidators } = require('../middlewares/fields-validators');
const { JWTValidator } = require('../middlewares/jwt-validator');

// Rutas

// Crear un nuevo Usuario
router.post('/new',[
    check( 'name', 'El nombre es Obligatorio y no debe estar vacío').not().isEmpty(),
    check( 'email', 'El Email es Obligatorio').isEmail(),
    check( 'password', 'La password es Obligatoria').isLength({min : 6}),
    fieldsValidators
] ,createUser);
// Primero va la ruta '/new', luego los midelwares [] y por ultimo el controlador

// Debemos separar el controlador de la ruta, dado que puede crecer mucho y puede no ser tan mantenible


// Ir al Login
router.post('/',  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({min: 6}),
    fieldsValidators
],loginUser);

// Validar y revalidar token de usuario
router.get('/renew',JWTValidator,renewToken);


// De esta manera podemos exportar variables en Node
module.exports = router;