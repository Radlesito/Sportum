// Función para cargar las noticias
function cargarNoticias() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'JSON/noticias.json', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            var noticias = JSON.parse(xhr.responseText);
            var salida = '';

            // Recorremos las noticias y creamos la estructura HTML con la clase noticia
            noticias.forEach(function(noticia) {
                salida += `<div class="noticia">`;
                salida += `<h2>${noticia.titulo}</h2>`;
                salida += `<p>${noticia.descripcion}</p>`;
                salida += `</div>`;
            });

            document.getElementById('noticias').innerHTML = salida;
        }
    };

    xhr.send();
}

window.onload = function() {
    cargarNoticias();
};
