/**
 * Este módulo proporciona una ruta para obtener datos de usuarios de un servicio externo.
 * Utiliza el paquete 'express' para definir y configurar la ruta.
 * También utiliza el paquete 'node-fetch' para realizar solicitudes HTTP a la API externa.
 * La ruta está configurada para manejar solicitudes GET en la raíz (/), 
 * donde se obtienen datos de usuarios desde 'https://jsonplaceholder.typicode.com/users' 
 * y se envían como respuesta en formato JSON.
 */

const { Router } = require('express'); // Importa la clase Router de express
const router = Router(); // Crea una instancia de Router

// Función fetch asincrónica que obtiene los datos de usuarios de la API externa
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Ruta GET para obtener datos de usuarios
router.get('/', async (req, res) => {
    try {
        // Realiza una solicitud GET a la API externa para obtener datos de usuarios
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        // Convierte la respuesta en formato JSON
        const users = await response.json();
        // Imprime los datos de usuarios en la consola
        console.log(users);
        // Envía los datos de usuarios como respuesta al cliente en formato JSON
        res.json(users);
    } catch (error) {
        // Manejo de errores si ocurre algún problema durante la solicitud o el procesamiento de datos
        console.error('Error al obtener los datos de usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los datos de usuarios' });
    }

    // Ruta GET para servir el código HTML y JavaScript
    app.get('/uploads', (req, res) => {
        try {
            // Lee el archivo que contiene el código HTML y JavaScript
            const htmlContent = fs.readFileSync('Uploads.html', 'utf8');
            res.send(htmlContent); // Envía el contenido HTML y JavaScript como respuesta
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al servir el archivo.'); // Envía una respuesta de error
        }
    });

});

module.exports = router; // Exporta la ruta para su uso en otros módulos