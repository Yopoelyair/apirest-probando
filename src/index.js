/**
 * Este archivo configura y ejecuta un servidor Express para una aplicación web.
 * Utiliza los paquetes express, multer y morgan para gestionar solicitudes HTTP, 
 * cargar archivos y registrar mensajes de registro respectivamente.
 * El servidor escucha en el puerto especificado en la variable de entorno PORT o en el puerto 3000 por defecto.
 * También establece la cantidad de espacios para formatear JSON en 2.
 * Se definen rutas para diferentes recursos de la aplicación, como empleados y usuarios.
 */

const express = require('express'); // Importa el paquete express
const multer = require('multer'); // Importa el paquete multer para gestionar archivos
const app = express(); // Crea una nueva instancia de la aplicación Express
const morgan = require('morgan'); // Importa el paquete morgan para el registro de solicitudes HTTP


// Configuración de la aplicación
app.set('port', process.env.PORT || 3000); // Establece el puerto del servidor
app.set('json spaces', 2); // Establece la cantidad de espacios para formatear JSON




// Middleware
app.use(morgan('dev')); // Utiliza el middleware morgan para registrar solicitudes HTTP en la consola
app.use(express.json()); // Middleware para analizar solicitudes con formato JSON
app.use(express.urlencoded({extended: false})); // Middleware para analizar solicitudes con datos codificados en URL


// Rutas de la aplicación
app.use(require('./routes/index')); // Ruta principal
app.use('/api/Empleados', require('./routes/Empleados')); // Ruta para gestionar empleados
app.use('/api/user', require('./routes/user')); // Ruta para gestionar usuarios
app.use('/api/Upload', require('./routes/Upload')); // Ruta para cargar archivos






// Inicia el servidor y escucha en el puerto especificado
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`); // Registra un mensaje indicando que el servidor está en ejecución
});