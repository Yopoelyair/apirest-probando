const express = require('express');
const fs = require('fs').promises; // Usar fs.promises para trabajar con promesas
const { PDFDocument } = require('pdfkit');
const axios = require('axios'); // Importar Axios para hacer peticiones HTTP

const app = express();

// Ruta para generar y mostrar el PDF de un usuario por su ID
app.get('/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id); // Obtener el ID del usuario desde los parámetros de la URL

        // Hacer la petición GET a la ruta con un ID específico
        const response = await axios.get(`http://localhost:3000/${userId}`, {
            responseType: 'arraybuffer' // Especificar el tipo de respuesta como arraybuffer para recibir datos binarios
        });

        // Enviar la respuesta recibida del otro servidor al cliente
        res.setHeader('Content-Type', 'application/pdf');
        res.send(response.data);
    } catch (err) {
        console.error('Error al generar el PDF:', err);
        res.status(500).send('Error al generar el PDF');
    }
});

// Función para escribir los datos del usuario en el PDF
function writeUserDataToPDF(doc, userData) {
    doc.fontSize(16).text('Datos del Usuario:', { underline: true });
    doc.fontSize(12).text(`Nombre: ${userData.nombre}`);
    doc.fontSize(12).text(`Apellido: ${userData.apellido}`);
    doc.fontSize(12).text(`Nacionalidad: ${userData.nacionalidad}`);
    doc.fontSize(12).text(`RUT: ${userData.rut}`);
}


