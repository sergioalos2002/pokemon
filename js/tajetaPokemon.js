var listaPokemons = [];
var listaTipos = [];
var nombreTarjetaPokemon = "";
var tipoTarjetaPokemon ="";
var color = "";
var habilidad = "";
var tipos = "";


window.onload = function() {
    cargarUsuario();
     cargarLista("Pokemon");
     cargarLista("Tipos");
    
     encontrarTipos();
     encontrarColor();
     pintarTarjeta();
}

function pintarTarjeta() {

    let tipos = tipoTarjetaPokemon.split(",");
    let texto = "";
    tipos.forEach(tipo => {
      texto = texto + `<img src="./images/tipos/${tipo}.png" width="40px" height="40px">`;        
    });  
    

    var centralTarjeta = document.getElementById("centralTarjeta");
    centralTarjeta.innerHTML = "";
    var tarjeta = document.createElement("div");
    
    centralTarjeta.appendChild(tarjeta);
        centralTarjeta.innerHTML = `<div class="card" style="width: 18rem; border: 10px solid black";>
                                        <img src="./images/pokemons/${nombreTarjetaPokemon}.png" class="card-img-top" alt="..." style=" background-color:#${color};">
                                            <div class="card-body" style="color: black;">
                                            <h5 class="card-title">${nombreTarjetaPokemon}</h5>
                                            <p class="card-text">${habilidad}</p>
                                            <p class="card-text"><span style="margin-right:20px">${tipoTarjetaPokemon}</span>${texto}</p>
                                            <a href="./listaPokemon.html"><button id="BTNAnadirEquipo" class="btn btn-primary">Añadir al equipo</button></a>
                                            </div>
                                    </div>`;
                                    document.getElementById("BTNAnadirEquipo").addEventListener("click", anadirEquipo);
}

function cargarLista(diferenciadorLista){
    if (diferenciadorLista == "Pokemon") {
        if (localStorage.getItem("listaPokemons")) {
            listaPokemons = JSON.parse(localStorage.getItem("listaPokemons"));
            console.log(listaPokemons);
        }else{
            console.log("No existe listaPokemons");
        }

        if (localStorage.getItem("nombreTarjetaPokemon")) {
            nombreTarjetaPokemon = localStorage.getItem("nombreTarjetaPokemon");
            console.log(nombreTarjetaPokemon);
        }else{
            console.log("No existe pokemon");
        }
       
    }else if (diferenciadorLista == "Tipos") {
        if (localStorage.getItem("listaTipos")) {
            listaTipos = JSON.parse(localStorage.getItem("listaTipos"));
            
        }else{
            console.log("No existe listaTipos");
        }
        
    }
}

function encontrarTipos() {
    var posicion = listaPokemons.findIndex(pokemon => pokemon.nombre == nombreTarjetaPokemon);
    if (posicion != -1) {
        tipoTarjetaPokemon = listaPokemons[posicion].tipo;
        habilidad = listaPokemons[posicion]["habilidad"];
        
    }
}
function encontrarColor() {
   let colores = tipoTarjetaPokemon.split(",");
   
   let colorTemporal = colores[0];
   var posicion = listaTipos.findIndex(tipo => tipo.nombre == colorTemporal);
   if (posicion != -1) {
    color = listaTipos[posicion]["color"];
   }  
}




// EQUIPO


function eliminarEquipo() {
    var indice = event.target.dato;
    var equipo = []
    if (localStorage.getItem("pokemonEquipo")) equipo = JSON.parse(localStorage.getItem("pokemonEquipo"));
    equipo.splice(indice, 1);
    localStorage.setItem("pokemonEquipo", JSON.stringify(equipo));
    mostrarEquipo();
}

function anadirEquipo() {
    

    var equipo = [];
    if (localStorage.getItem("pokemonEquipo")) equipo = JSON.parse(localStorage.getItem("pokemonEquipo"));

   
        var Pokemon = {
                "nombre": nombreTarjetaPokemon,
                "imagen": nombreTarjetaPokemon+".png",
                "color": color,
                
            }
            if (equipo.length < 6) {
                equipo.push(Pokemon);
                localStorage.setItem("pokemonEquipo", JSON.stringify(equipo));
                console.log(equipo);
            }else{
                console.log("No se ha añadido al pokemon debido a que el maximo de pokemons es 6");
            }
        
   
}



function mostrarEquipo() {
    var equipo = []
    if (localStorage.getItem("pokemonEquipo")) equipo = JSON.parse(localStorage.getItem("pokemonEquipo"));

    var capaEquipo = document.getElementById("centralEquipo");
    capaEquipo.innerHTML = "";
    capaEquipo.style.display = "block";
    capaEquipo.style.paddingTop = "100px";

    var colocacionDivImagen = document.createElement("div");
    colocacionDivImagen.style.paddingLeft="200px";
    colocacionDivImagen.style.paddingBottom="20px";
    capaEquipo.appendChild(colocacionDivImagen);
    
    var imgCerrar = document.createElement("img");
    imgCerrar.src = "./images/pokeball.png";
    imgCerrar.width = "40";
    imgCerrar.height = "40";
    imgCerrar.id = "imgCerrar";
    colocacionDivImagen.appendChild(imgCerrar);
    imgCerrar.addEventListener("click", function() {
        document.getElementById("centralEquipo").style.display = "none";
    });
    
    var titulo = document.createElement("h4");
    titulo.innerHTML = "Tu equipo Pokemon";
    titulo.style.fontFamily = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";
    titulo.style.paddingBottom = "20px";
    titulo.style.color = "white";
    capaEquipo.appendChild(titulo);
    


    for (i = 0; i < equipo.length; i++) { 
        var parrafo = document.createElement("p");
        capaEquipo.appendChild(parrafo);
        var imgPokemon = document.createElement("img");
        imgPokemon.src = "./images/pokemons/"+equipo[i].imagen;
        imgPokemon.style.backgroundColor = `#${equipo[i].color}`;
        imgPokemon.width = "40";
        imgPokemon.height = "40";
        parrafo.appendChild(imgPokemon);

        var span = document.createElement("span");
        span.appendChild(document.createTextNode("  " + equipo[i].nombre));
        span.style.paddingRight = "10px";
        parrafo.appendChild(span);
        

        var img = document.createElement("img");
        img.src = "./images/eliminar.png";
        img.width = "40";
        img.height = "40";
        img.dato = i;
        
        img.addEventListener("click", eliminarEquipo)
        parrafo.appendChild(img);

    }
    var parrafo = document.createElement("p");
    capaEquipo.appendChild(parrafo);
    var span = document.createElement("span");
    span.appendChild(document.createTextNode("TOTAL " + totaltotal));
    parrafo.appendChild(span);
    var boton = document.createElement("button");
    boton.type = "button";
    boton.addEventListener("click", cargarPaginaequipo);
    boton.appendChild(document.createTextNode("FINALIZAR"));
    parrafo.appendChild(boton);
}




