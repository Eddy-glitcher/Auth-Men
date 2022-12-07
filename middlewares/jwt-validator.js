const { response } = require("express");
const jwt  = require("jsonwebtoken");

const JWTValidator = (req,res= response,next)=>{

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok  : false,
            msg : 'Error en el token',
        });
    }
    
    try {

        // validar los tokens generados con el jwt local
        const {uid,name, email} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        console.log(uid, name);


        // Podemos pasarle la req al controlador ya que todos los objetos pasan por referencia en javascript

        req.uid  = uid;
        req.name = name;
        req.email = email;

    } catch (error) {
        return res.status(401).json({
            ok  : false,
            msg : 'Token Inválido',
        });
    }

    // Si todo sale bien...
    next();

}

module.exports={
    JWTValidator
}