const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Guarda los archivos en la carpeta "uploads"
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Utiliza el nombre original del archivo
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
