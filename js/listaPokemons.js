var listaPokemons = [];
listaPokemons.push(new Pokemon("Pikachu","Electricidad Estática","electrico","Pikachu.png"));
listaPokemons.push(new Pokemon("Beautifly","Enjambre","bicho,volador","Beautifly.png"));
listaPokemons.push(new Pokemon("Dottler","Ojo Compuesto,Enjambre","bicho,psiquico","Dottler.png"));
listaPokemons.push(new Pokemon("Dragapult","Cuerpo Puro,Allanamiento","dragon,fantasma","Dragapult.png"));
listaPokemons.push(new Pokemon("Eternatus","Presión","veneno,dragon","Eternatus.png"));
listaPokemons.push(new Pokemon("Giratina","Presión","fantasma,dragon","Giratina.png"));
listaPokemons.push(new Pokemon("Groudon","Sequía","tierra","Groudon.png"));
listaPokemons.push(new Pokemon("Lucario","Foco Interno,Impasible","lucha,acero","Lucario.png"));
listaPokemons.push(new Pokemon("Meowth","Recogida,Experto","normal","Meowth.png"));
listaPokemons.push(new Pokemon("Ponyta","Fuga,Absorbe Fuego","fuego","Ponyta.png"));
listaPokemons.push(new Pokemon("Regirock","Cuerpo Puro","roca","Regirock.png"));
listaPokemons.push(new Pokemon("Skarmory","Vista Lince,Robustez","acero,volador","Skarmory.png"));
listaPokemons.push(new Pokemon("Skiddo","Herbívoro","planta","Skiddo.png"));
listaPokemons.push(new Pokemon("Spheal","Sebo,Gélido","hielo,agua","Spheal.png"));
listaPokemons.push(new Pokemon("Umbreon","Sincronía","siniestro","Umbreon.png"));
listaPokemons.push(new Pokemon("Vanillite","Manto Níveo,Gélido","hielo","Vanillite.png"));
listaPokemons.push(new Pokemon("Victini","Tinovictoria","psiquico,fuego","Victini.png"));
listaPokemons.push(new Pokemon("Articuno","Presión","hielo,volador","Articuno.png"));
listaPokemons.push(new Pokemon("Zapdos","Presión","electrico,volador","Zapdos.png"));
listaPokemons.push(new Pokemon("Moltres","Presión","fuego,volador","Moltres.png"));




window.onload = function() {
    pintarTabla(listaPokemons);
    cargarUsuario();
}

function pintarTabla(lista) {
    var centralPokemon = document.getElementById("centralPokemon");
    centralPokemon.innerHTML = "";
    var tabla = document.createElement("table");
    centralPokemon.appendChild(tabla);
    //Primera Ejecucion
        var Pfila = document.createElement("tr");
        tabla.appendChild(Pfila);
        var celdaNombre = document.createElement("td");
        var celdaHabilidad = document.createElement("td");
        var celdaTipo = document.createElement("td");
        var celdaImagen = document.createElement("td");
        Pfila.appendChild(celdaNombre);
            celdaNombre.innerHTML = "Nombre";
        Pfila.appendChild(celdaHabilidad);
            celdaHabilidad.innerHTML = "Habilidad";
        Pfila.appendChild(celdaTipo);
            celdaTipo.innerHTML = "Tipo";
        Pfila.appendChild(celdaImagen);
            celdaImagen.innerHTML = "Imagen";
    //Fin primera Ejecucion
    lista.forEach(pokemon => {
        var fila = document.createElement("tr");
        tabla.appendChild(fila);
        for (propiedad in pokemon){
            var celda= document.createElement("td");
            celda.style.paddingLeft = "40px";
            fila.appendChild(celda);
            if (propiedad != "foto") {
                celda.innerHTML = pokemon[propiedad];
            }else{
                celda.innerHTML = `<a href='./pokemon.html'><img onclick="cargarVentana('${pokemon.nombre}')" src='./images/pokemons/${pokemon[propiedad]}' width='100px' height='100px'></a>`;
            }
        }
       

        var celdaEliminar = document.createElement("td");
        fila.appendChild(celdaEliminar);
        celdaEliminar.innerHTML = "<div style='padding-left: 40px;'><img style='height:40px;width:40px;' src='./images/eliminar.png'><span>  eliminar</span></div>";
        celdaEliminar.addEventListener("click", () => eliminar(pokemon));
    });

    localStorage.setItem("listaPokemons",JSON.stringify(listaPokemons));

}


function eliminar(pokemonAEliminar) {
    var posicion = listaPokemons.findIndex(pokemon => pokemon.nombre == pokemonAEliminar.nombre);
    if (posicion != -1) {
        listaPokemons.splice(posicion, 1);
        pintarTabla(listaPokemons);
    }
}
function ordenar() {
    listaPokemons.sort((a, b) => {
        if (a.nombre > b.nombre) return 1
        else return -1;
    });
    pintarTabla(listaPokemons);
}

function filtrarTipos() {
    let textoTipos = document.getElementById("textoTipos").value.toLowerCase().trim();
    if (textoTipos!="") {
        let listaFiltrada = listaPokemons.filter((pokemon) => pokemon.tipo.toLowerCase().includes(textoTipos));
        pintarTabla(listaFiltrada);
    }else{
        pintarTabla(listaPokemons);
    }
}
function filtrarPorNombre() {
    let textoNombre = document.getElementById("textoNombre").value.toLowerCase();
    let listaFiltrada = listaPokemons.filter((pokemon) =>
        pokemon.nombre.toLowerCase().includes(textoNombre));
    pintarTabla(listaFiltrada);
}

function cargarVentana(nombre){
    localStorage.setItem("nombreTarjetaPokemon",nombre);
}
