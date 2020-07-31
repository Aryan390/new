var lista = [];
var urlUsers = 'https://prueba3.com/api/getPosts';
/*var urlUsers = 'comentarios.json';*/
let contenedorComentario = document.getElementById('contenedor_comentario');
let viewBtn =document.getElementById('view-comments')
let navBtn = document.getElementById('toggle-button')

// function for getting response and calling cargarComentarios using axios
function recibirUsuarios(){
    axios.get(urlUsers)
        .then(response => {
        lista = response.data;
        lista.forEach( (elemento) => {
            elemento.comments.forEach( (comentario)=>{
                cargarComentarios(comentario);
            })
        })
    });
}

// function for generating comments
function cargarComentarios(comentario){
    let auxComentario = document.createElement("div");
    auxComentario.innerHTML = 
        `<div id="tarjeta_comentario"           class="tarjeta_comentario">
            <div class="header_comentario">
                    <img src="${comentario.image}" alt="mujer cara" class="image"/>

                <div id="perfil" class="perfil">
                    <div id="estrellas" class="estrellas">
                        ${cargarEstrellas(comentario.stars)} 
                    </div>
                </div>
            </div>


            <div class="content-container">
                <div class="upper-content">
                    <div class="nombre_perfil">
                        <h1>${comentario.username}</h1>
                    </div>

                    <div class="texto_comentario">
                        <p>${comentario.comment}</p>
                    </div>

                </div>

                <div class="footer_comentario">

                    <div class="like-dislike"> 
                        <img class="thumb like"src="src/assets/thumb.png"/> 
                        <h3>${comentario.likesDislikes.likes}
                        </h3> 
                    </div>

                    <div class="like-dislike"> 
                        <img class="thumb dislike" src="src/assets/thumb.png"/> 
                        <h3>${comentario.likesDislikes.dislikes}</h3> 
                    </div>

                    <div class="comentarios_reply">
                        <h3>Reply</h3>
                    </div>
                </div>
                
                <div class="comentarios_boton">
                    <img src="../images/icons8-expand-arrow-24.png/>"
                    <h3>ver 15 commentarios</h3>
                </div> 
            </div>
            
        </div>`;
        contenedorComentario.appendChild(auxComentario);    
}

// function for generating no. of stars and the container boxes of the stars
function cargarEstrellas(numeroEstrellas){
   let nodo = document.createElement("div");

    for(let i=1;i<=5;i++){
        let estrella = document.createElement('img')
        estrella.src = '../images/star.png'
        if(i<=numeroEstrellas){
            estrella.classList = 'estrella'
            nodo.appendChild(estrella)
        }else{
            estrella.classList = 'estrella fade'
            nodo.appendChild(estrella)
        }
    }
    console.log(nodo);
    return nodo.innerHTML
}

recibirUsuarios();

// event listener for view comments button
viewBtn.addEventListener('click',function(){
    contenedorComentario.classList.toggle('fade')
    if(viewBtn.innerHTML ==='view comments'){
        viewBtn.innerHTML = 'hide comments'
    }else{
        viewBtn.innerHTML = 'view comments'
    }
})
