function convertirFormulario() {
    var nombre = document.getElementById('nombre').value.trim();
    var rut = document.getElementById('rut').value.trim();
    var email = document.getElementById('email').value.trim();

    // Verificar si algún campo está vacío
    if (nombre === '') {
        alert('No ha ingresado el nombre.');
        return false;
    }

    if (rut === '') {
        alert('No ha ingresado el RUT.');
        return false;
    }

    if (email === '') {
        alert('No ha ingresado el correo electrónico.');
        return false;
    }

    // Construir el contenido del formulario como texto plano con saltos de línea
    var contenidoFormulario =  nombre + "\n" +
                               rut + "\n" +
                               email;

    // Seleccionar el contenedor del formulario
    var contenedorFormulario = document.getElementById('registroForm');

    // Calcular el ancho y la altura del contenedor de los datos
    var datosAncho = contenedorFormulario.offsetWidth;
    var datosAltura = contenedorFormulario.offsetHeight;

    // Convertir el contenido del formulario a una imagen PNG centrada
    html2canvas(contenedorFormulario, {
        x: (contenedorFormulario.offsetWidth - datosAncho) / 2,
        y: (contenedorFormulario.offsetHeight - datosAltura) / 2,
        width: datosAncho,
        height: datosAltura,
        scale: 1
    }).then(canvas => {
        // Crear un lienzo para dibujar la imagen PNG
        var canvasImagen = document.createElement('canvas');
        // Ajustar el ancho del lienzo al doble de las dimensiones especificadas
        var lienzoAncho = 1000;
        canvasImagen.width = lienzoAncho;
        canvasImagen.height = datosAltura * (lienzoAncho / datosAncho);
        var ctx = canvasImagen.getContext('2d');

        // Ajustar el tamaño de la fuente para que los datos sean más grandes
        var fontSize = 63; // Ajusta este valor según sea necesario

        // Dibujar el contenido del formulario en el lienzo con el tamaño de fuente ajustado
        ctx.font = fontSize + 'px Arial';
        var y = fontSize; // Iniciar la posición vertical en función del tamaño de fuente
        contenidoFormulario.split('\n').forEach(linea => {
            var x = (lienzoAncho - ctx.measureText(linea).width) / 2; // Calcular la posición horizontal centrada
            ctx.fillText(linea, x, y);
            y += fontSize + 10; // Incrementar la posición vertical según el tamaño de fuente
        });

        // Crear un enlace para descargar la imagen
        var enlace = document.createElement('a');
        enlace.href = canvasImagen.toDataURL('image/png');
        enlace.download = 'formulario.png';
        // Simular un clic en el enlace para iniciar la descarga
        enlace.click();
    }).catch(function(error) {
        console.error('Error al convertir el formulario:', error);
    });

    // Detener el envío del formulario
    return false;
}
