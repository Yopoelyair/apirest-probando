const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Endpoint para obtener el contenido de un archivo de texto en Base64
app.get('/api/archivo', (req, res) => {
    const filePath = path.join(__dirname, './prueba.txt'); // Ruta al archivo de texto en el servidor
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Convertir el contenido del archivo a Base64 y enviarlo como respuesta
        const base64Data = Buffer.from(data, 'binary').toString('base64');
        res.send(base64Data);
    });
});

app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});
