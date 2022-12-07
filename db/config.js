const mongoose = require("mongoose");

const dbConnection = async() => {
    // Usamos el async para que mi aplicación no continue hasta que se levante mi base de datos
    try {
        
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser    : true,
            useUnifiedTopology : true,
            autoIndex          : true,

            // Configuraciones por defecto de mongoose =)
        });

        console.log("Db Online");

    } catch (error) {
        console.log(error);
        throw new Error("Error al inicializar la db");
    }

}

module.exports = {
    dbConnection
}