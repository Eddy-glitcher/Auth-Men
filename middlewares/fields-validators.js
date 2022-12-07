const { response } = require("express");
const { validationResult } = require("express-validator");

const fieldsValidators = (req,res = response, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors : errors.mapped()
        });
    }

    next();
    // Si no se encuentraan errores le damos paso a la respuesta del controlador


    // UN Closter no es mas que un conjunto de servidores que están trabajando como si fueran uno solo
}

module.exports = {
    fieldsValidators
};