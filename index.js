const express = require('express');
const path = require('path');
// Importamos el servicio de express

const cors = require('cors');
const { dbConnection } = require('./db/config');

require('dotenv').config();  //Para configurar las variables de entorno


// Crear el servidor/aplicacion de express
const app = express();

// Conexion a la base de datos
dbConnection();


// Directorio Publico para que cualquiera que tenga la url, acceda a nuestra app
// Hace posible que express pueda servir la página html o index.html
app.use(express.static('public'));

// CORS
app.use(cors());
// En los cors ya esta hecha la configuracion de todo lo que necesitamos por defecto, pero podemos configurar la recibida de datos de un dominio que ya conozcamos ayudando un poco a la protección de rutas

// LECTURA Y PARSEO DEL BODY
app.use(express.json());

// Rutas
// Usualmente se usa un MidelWare de express, el cual no es más que una funcion que se ejecuta cuando el inteprete pase por todas estas lineas de codigo

app.use('/api/auth', require('./routes/auth'));

// Manejador de otras rutas como /dashboard...
app.get( '*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html')); // Buscamos el path donde tenemos el index de la aplicación
})
// Se esta haciendo una peticion get desde la vista dashboard por eso se usa get.



// GET
//Cuando resivamos una peticion al / se ejecutará el contenidod e la función 

// app.get('/', (req,res)=>{

//     // Enviamos el metodo status() si queremos mandar un estado de la respuesta ya sea de error
//     res.status(200).json({
//         ok     : true,
//         saludo : 'Hola',
//         uid    : 1234
//     })

// })

// Para escuchar cualquier info que venga hacia algun puerto en especifico
app.listen( process.env.PORT || 4000, ()=>{
    // Este callback se ejecuta cuando levantamos la aplicación
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});
// el listen es necesario dado que en caso de que no lo pongamos no podremos escuchar la solicitud al servicio a través del puerto local 4000