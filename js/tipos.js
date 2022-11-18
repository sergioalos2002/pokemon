var listaTipos = [];
var minLista = 0;
var maxLista = 4;
listaTipos.push(new Tipo("acero","acero.png","bfbbbb"));
listaTipos.push(new Tipo("volador","volador.png","fefefe"));
listaTipos.push(new Tipo("agua","agua.png","0059ff"));
listaTipos.push(new Tipo("hielo","hielo.png","33e3ff"));
listaTipos.push(new Tipo("planta","planta.png","92ef22"));
listaTipos.push(new Tipo("bicho","bicho.png","23700e"));
listaTipos.push(new Tipo("electrico","electrico.png","eef11d"));
listaTipos.push(new Tipo("normal","normal.png","c6a153"));
listaTipos.push(new Tipo("roca","roca.png","735515"));
listaTipos.push(new Tipo("tierra","tierra.png","e5a722"));
listaTipos.push(new Tipo("fuego","fuego.png","f20d0d"));
listaTipos.push(new Tipo("lucha","lucha.png","e9ad1a"));
listaTipos.push(new Tipo("hada","hada.png","e91ac6"));
listaTipos.push(new Tipo("psiquico","psiquico.png","971ae9"));
listaTipos.push(new Tipo("veneno","veneno.png","076820"));
listaTipos.push(new Tipo("dragon","dragon.png","ab50f3"));
listaTipos.push(new Tipo("fantasma","fantasma.png","000000"));
listaTipos.push(new Tipo("siniestro","siniestro.png","3e3232"));


window.onload = function() {
    
    pintarTarjeta(listaTipos.slice(minLista,maxLista));
    document.getElementById("verMas").addEventListener("click",()=> verMas(4))
    cargarUsuario();
}


// function pintarTabla(lista) {
//     var centralTipos = document.getElementById("centralTipos");
//     centralTipos.innerHTML = "";
//     centralTipos.className ="container-fluid";
//     var tabla = document.createElement("table");
//     centralTipos.appendChild(tabla);
//     lista.forEach(tipo => {
//         var fila = document.createElement("tr");
//         tabla.appendChild(fila);
//         for (propiedad in tipo){
//             var celda= document.createElement("td");
//             fila.appendChild(celda);
//             if (propiedad != "foto" && propiedad != "color") {
//                 celda.innerHTML = tipo[propiedad];
//             }else if (propiedad == "foto") {
//                 celda.innerHTML = "<img src='./images/tipos/"+tipo[propiedad]+"' width='100px' height='100px'>";
//             }else{
                
//             }
//         }
//         var celdaModificar = document.createElement("td");
//         fila.appendChild(celdaModificar);
//         celdaModificar.innerHTML = "<img style='height:40px;width:40px; left-padding:40px' src='./images/edicion.png'><span>  modificar</span>";
//         celdaModificar.addEventListener("click", () => modificar(tipo));

//         var celdaEliminar = document.createElement("td");
//         fila.appendChild(celdaEliminar);
//         celdaEliminar.innerHTML = "<div style='padding-left: 40px;'><img style='height:40px;width:40px;' src='./images/eliminar.png'><span>  eliminar</span></div>";
//         celdaEliminar.addEventListener("click", () => eliminar(tipo));
//     });

    

// }




function pintarTarjeta(lista) {
    var centralTipos = document.getElementById("centralTipos");
    centralTipos.className ="container-fluid";
    centralTipos.style.paddingLeft = "200px"
    var tabla = document.createElement("table");
    centralTipos.appendChild(tabla);
    var tBody = document.createElement("tbody");
    tabla.appendChild(tBody);
    var contador = 0;
    var tFile = document.createElement("tr");
    tBody.appendChild(tFile);
    lista.forEach(tipo => {
        
        if (contador == 4) {
            tFile = document.createElement("tr");
            tBody.appendChild(tFile);
            contador = 0;
        }
        contador++;

        var tColumna = document.createElement("td");
        tFile.appendChild(tColumna);


        tFile.innerHTML+=`<td style="padding-left:100px;padding-top:50px"><div class="card" style="width: 15rem; border: 10px solid #${tipo.color}";>
                            <img src="./images/tipos/${tipo.foto}" class="card-img-top" alt="..." style=" background-color:#${tipo.color};">
                            <div class="card-body" style="color: black;background-color:white;border: 3px solid black;">
                            <h5 class="card-title">${tipo.nombre}</h5>
                            <div id="contenedorModificar"onclick="modificar('${tipo.nombre}')"><img style='height:40px;width:40px; left-padding:40px' src='./images/edicion.png'><span>  modificar</span></div><br>
                            <div id="contenedorEliminar" onclick="eliminar('${tipo.nombre}')"><img style='height:40px;width:40px;' src='./images/eliminar.png'><span>  eliminar</span></div>
                            </div>
                            </div></td>`;
    });
    localStorage.setItem("listaTipos",JSON.stringify(listaTipos));
}


function eliminar(tipoAEliminar) {
    console.log(tipoAEliminar);
    var posicion = listaTipos.findIndex(tipo => tipo.nombre == tipoAEliminar);
    if (posicion != -1) {
        listaTipos.splice(posicion, 1);
        vaciarLista();
        pintarTarjeta(listaTipos);
    }
}
function ordenar() {
    listaTipos.sort((a, b) => {
        if (a.nombre > b.nombre) return 1
        else return -1;
    });
    vaciarLista();
    pintarTarjeta(listaTipos);
}

function modificar(tipoAModificar) {
    var posicion = listaTipos.findIndex(tipo => tipo.nombre == tipoAModificar);
    if (posicion != -1) {
        
        var tipo = listaTipos[posicion];
        let divnuevoTipo;
        if (document.getElementById("nuevoTipo")) {
            divnuevoTipo = document.getElementById("nuevoTipo");
        } else {
            divnuevoTipo = document.createElement("div");
           
            divnuevoTipo.id = "nuevoTipo";
            document.body.appendChild(divnuevoTipo);
        }
        divnuevoTipo.innerHTML = `  <br><br><div class='row'>
                                        <div class='col-5'></div>
                                        <div class='col'>
                                            <span>nombre </span>
                                            <input type="text" id="nombreTipo" value="${tipo.nombre}"><br>
                                            <span>foto</span>
                                            <input type="file" id="fotoTipo" value="${tipo.foto}"><br>
                                            
                                            <button type="button" onclick="crearTipoModificado('${posicion}')">Crear</button>
                                            <button type="button" onclick="borrarDivnuevoTipo()">Cancelar</button></button>
                                        </div>
                                    <div>
                                      `
    } 
}

function crearTipoModificado(posicion) {

    let nombreTipo = document.getElementById("nombreTipo").value;
    let fotoTipo = document.getElementById("fotoTipo").value;
    


    listaTipos[posicion]["nombre"] = nombreTipo;
    listaTipos[posicion]["foto"] = fotoTipo;
    
    
    
    borrarDivnuevoTipo();
    vaciarLista();
    pintarTarjeta(listaTipos);
}
function borrarDivnuevoTipo() {
    document.getElementById("nuevoTipo").innerHTML = "";
}
function filtrar() {
    let textoABuscar = document.getElementById("textoABuscar").value.toLowerCase();
    let listaFiltrada = listaTipos.filter((tipo) =>
        tipo.nombre.toLowerCase().includes(textoABuscar));
        vaciarLista();
        pintarTarjeta(listaFiltrada); 
    
}
function verMas(incrementador) {
    if (maxLista<listaTipos.length) {
        minLista+=incrementador;
        maxLista+=incrementador;
        pintarTarjeta(listaTipos.slice(minLista,maxLista));
    }else{
        alert("No hay mas tipos que mostrar");
    }
}
function vaciarLista() {
    document.getElementById("centralTipos").innerHTML="";

}