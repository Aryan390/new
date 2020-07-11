var lista = [];
var urlUsers = 'https://prueba3.com/api/getPosts';
/*var urlUsers = 'comentarios.json';*/

function recibirUsuarios(){
    axios.get(urlUsers).then(response => {
        lista = response.data;
        lista.forEach( (elemento) => {
            elemento.comments.forEach( (comentario)=>{
                cargarComentarios(comentario);
            })
        })
    });
}
function cargarComentarios(comentario){
    let contenedorComentario = document.getElementById('contenedor_comentario');
    let auxComentario = document.createElement("div");
    auxComentario.innerHTML = 
        `<div id="tarjeta_comentario" class="tarjeta_comentario">
            <div class="header_comentario">
                <div class="contenedor_imagenPerfil">
                    <img src="${comentario.image}" alt="mujer cara" />
                </div>
                <div id="perfil" class="perfil">
                <div id="estrellas" class="estrellas">
                ${cargarEstrellas(comentario.stars)} 
            </div>
                    <div class="nombre_perfil">
                        <span>${comentario.username}</span>
                    </div>
                </div>
            </div>
            <div class="texto_comentario">
                 <p>${comentario.comment}</p>
            </div>
                <div class="footer_comentario">
                    <div class="likes">
                        <div> <img class="thumb like"src="src/assets/thumb.png"/> <span>${comentario.likesDislikes.likes}</span> </div>
                        <div> <img class="thumb dislike" src="src/assets/thumb.png"/> <span>${comentario.likesDislikes.dislikes}</span> </div>
                    </div>
                    <div class="comentarios_boton">
                        <span>Comentarios(15)</span>
                    </div>
                    <div class="comentarios_reply">
                        <span>Reply</span>
                    </div>
                </div>
        </div>`;
        contenedorComentario.appendChild(auxComentario);    
}
function cargarEstrellas(numeroEstrellas){
   let nodo = document.createElement("div");
   switch (numeroEstrellas){
        case 1:
            return nodo.innerHTML=
            `<span class="estrella">&#9733;</span>
            <span class="estrella"></span>
            <span class="estrella"></span>
            <span class="estrella"></span>
            <span class="estrella"></span>
            <div class="nota">
             <p>Note: ${numeroEstrellas}/5</p>
            </div>` 
        break;
        case 2:
            return nodo.innerHTML=
            `<span class="estrella">&#9733;</span>
            <span class="estrella">&#9733;</span>
            <span class="estrella"></span>
            <span class="estrella"></span>
            <span class="estrella"></span>
            <div class="nota">
             <p>Note: ${numeroEstrellas}/5</p>
            </div>` 
        break;
        case 3:
            return nodo.innerHTML=
            `<span class="estrella">&#9733;</span>
            <span class="estrella">&#9733;</span>
            <span class="estrella">&#9733;</span>
            <span class="estrella"></span>
            <span class="estrella"></span>
            <div class="nota">
             <p>Note: ${numeroEstrellas}/5</p>
            </div>`     
        break;
        case 4:
            return nodo.innerHTML=
            `<span class="estrella">&#9733;</span>
            <span class="estrella">&#9733;</span>
            <span class="estrella">&#9733;</span>
            <span class="estrella">&#9733;</span>
            <span class="estrella"></span>
            <div class="nota">
             <p>Note: ${numeroEstrellas}/5</p>
            </div>`
        break;
        case 5:
            return nodo.innerHTML=
            `<span class="estrella">&#9733;</span>
            <span class="estrella">&#9733;</span>
            <span class="estrella">&#9733;</span>
            <span class="estrella">&#9733;</span>
            <span class="estrella">&#9733;</span>
            <div class="nota">
             <p>Note: ${numeroEstrellas}/5</p>
            </div>`
        break;
        default:
            return nodo.innerHTML=
            `<span class="estrella"></span>
            <span class="estrella"></span>
            <span class="estrella"></span>
            <span class="estrella"></span>
            <span class="estrella"></span>
            <div class="nota">
             <p>Note: ${numeroEstrellas}/5</p>
            </div>` 
        break;
   }

}

recibirUsuarios();
