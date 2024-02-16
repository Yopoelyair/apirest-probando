const fs = require('fs');

const { Router } = require('express');
const router = Router();

// Función para convertir una cadena base64 en un Blob
function base64toBlob(base64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

// Función para descargar el PDF desde base64
function downloadPDFFromBase64(base64Data, filename) {
    const blob = base64toBlob(base64Data, 'application/pdf');
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.click();
}

// Lee el contenido del archivo 'prueba.txt' de forma asíncrona
fs.readFile('prueba.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Llamar a la función para descargar el PDF
    downloadPDFFromBase64(data, 'archivo.pdf');
});

module.exports = router;
