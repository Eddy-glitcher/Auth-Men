
const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {generateJWT} = require('../helpers/jwt');

// Este se conoce como el controlador de esta ruta '/new'
const createUser =  async(req, res = response) => {

    const {name,email,password} = req.body;

    
    try {
        // Verificar que el email no esté en la db
        const user = await User.findOne({email});
        // Regresa un objeto en caso de encontrar el email

        if (user) {
            return res.status(400).json({
                ok : false,
                msg: 'User alredady Exists whit that email'
            });
        }

        // Crear Usuario con el modelo

        const dbUser = new User(req.body);

        // Hashear o encriptar la contraseña

        const salt = bcrypt.genSaltSync();
        // Un salt es una forma de crear numeros aleatorios

        // Modificamos la contraseña de la petición
        dbUser.password  = bcrypt.hashSync(password , salt);

        // Generar el JWT el cual mandaremos a angular para que lo autentifique como metodo autenticacion pasiva
        
        const token = await generateJWT(dbUser.id, name);

        // Crear usuario en db

        await dbUser.save();

         // Generar respuesta Exitosa

        return res.status(201).json({
            ok: true,
            uid : dbUser.id,
            name : name,
            email,
            msg: ' User Created successsfully',
            token
        });

    } catch (error) {

        console.log(error);
        // Se muestra aqui porque si lo enseñamos en el return podemos mostrar una vulnerabilidad en la aplicación.
        return res.status(500).json({
            ok  : false,
            msg : 'Talk with the Admin /new'
        });
    }

    

}

const loginUser = async(req,res = response)=>{

    const {email,password} = req.body;

    try {
        const dbUser = await User.findOne({email});

        // Confirmamos si el email no existe
        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Este correo no existe'
            });
        }

        // Confirmamos si el password hace match
        const valisPassword = bcrypt.compareSync(password, dbUser.password);

        if (!valisPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es correcta'
            });
        }

        // Si el email y la password existen...
        // Generamos el JWT
        const token = await generateJWT(dbUser.id, dbUser.name);

        // Respuesta del servicio
        return res.json({
            ok: true,
            msg: dbUser.uid,
            name: dbUser.name,
            email : dbUser.email,
            uid: dbUser.id,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok  : false,
            msg : 'Error al loggearse verificar campos!'
        });
    }
}

const renewToken = async(req,res = response)=>{

    // capturamos el header de la peticion de postman :)
    // Creamos un middleware para validar tokens en caso de que usemos muchos puntos de accesos y de esta manera evitamos tener que crear uun return con estado por cada uno.

    const {uid,} = req;

    // Leer la base de datos para obtener el email

    // const dbUser = User.findById(uid);
    const dbUser = await User.findById(uid);
    // el findById funciona mas rapido que el findOne

    const token = await generateJWT(uid,dbUser.name,);
    // No es bueno pasarle el email o mas parametros al generador de JWT dado que se vuelve mass pesado y lento

    return res.json({
        ok  : true,
        msg : 'Renew',
        uid,
        name : dbUser.name,
        email: dbUser.email,
        token
    });
}

module.exports = {
    createUser,
    loginUser,
    renewToken
};