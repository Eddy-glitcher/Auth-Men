const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {

    const payload = {uid, name};

    return new Promise((resolve, reject)=>{
        // Usamos esta promesa para que podamos retornar el JWT y que de esta manera podamos hacer uso del los métodos then, catch, finally....

        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn : '24h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}