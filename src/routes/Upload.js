const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Directorio donde se guardarán los archivos subidos
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Nombre del archivo: fecha actual + nombre original del archivo
    }
});

const upload = multer({ storage: storage });

// Ruta POST para manejar la subida de archivos
router.put('/', upload.single('file'), (req, res) => {
    try {
        const fileContent = fs.readFileSync(req.file.path);
        const base64Data = fileContent.toString('base64');
        fs.unlinkSync(req.file.path); // Elimina el archivo subido después de la conversión

        // Guardar el contenido base64 en un archivo plano
        fs.writeFileSync('prueba.txt', base64Data, 'base64');

        res.send('Archivo guardado correctamente.'); // Envía una respuesta exitosa
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al procesar el archivo.'); // Envía una respuesta de error
    }

    // Lee el contenido del archivo 'output.txt' de forma síncrona
const fileContent = fs.readFileSync('output.txt', 'utf8');

// Muestra el contenido en la consola
console.log(fileContent);
});

module.exports = router;
