var listaTipos = [];
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
    pintarTabla(listaTipos);
    cargarUsuario();
}


function pintarTabla(lista) {
    var centralTipos = document.getElementById("centralTipos");
    centralTipos.innerHTML = "";
    var tabla = document.createElement("table");
    centralTipos.appendChild(tabla);
    lista.forEach(tipo => {
        var fila = document.createElement("tr");
        tabla.appendChild(fila);
        for (propiedad in tipo){
            var celda= document.createElement("td");
            fila.appendChild(celda);
            if (propiedad != "foto" && propiedad != "color") {
                celda.innerHTML = tipo[propiedad];
            }else if (propiedad == "foto") {
                celda.innerHTML = "<img src='./images/tipos/"+tipo[propiedad]+"' width='100px' height='100px'>";
            }else{
                
            }
        }
        var celdaModificar = document.createElement("td");
        fila.appendChild(celdaModificar);
        celdaModificar.innerHTML = "<img style='height:40px;width:40px; left-padding:40px' src='./images/edicion.png'><span>  modificar</span>";
        celdaModificar.addEventListener("click", () => modificar(tipo));

        var celdaEliminar = document.createElement("td");
        fila.appendChild(celdaEliminar);
        celdaEliminar.innerHTML = "<div style='padding-left: 40px;'><img style='height:40px;width:40px;' src='./images/eliminar.png'><span>  eliminar</span></div>";
        celdaEliminar.addEventListener("click", () => eliminar(tipo));
    });

    localStorage.setItem("listaTipos",JSON.stringify(listaTipos));

}

function eliminar(tipoAEliminar) {
    var posicion = listaTipos.findIndex(tipo => tipo.nombre == tipoAEliminar.nombre);
    if (posicion != -1) {
        listaTipos.splice(posicion, 1);
        pintarTabla(listaTipos);
    }
}
function ordenar() {
    listaTipos.sort((a, b) => {
        if (a.nombre > b.nombre) return 1
        else return -1;
    });
    pintarTabla(listaTipos);
}

function modificar(tipoAModificar) {


    var posicion = listaTipos.findIndex(tipo => tipo.nombre == tipoAModificar.nombre);
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
                                        <div class='col-4'></div>
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
    pintarTabla(listaTipos);
}
function borrarDivnuevoTipo() {
    document.getElementById("nuevoTipo").innerHTML = "";
}
function filtrar() {
    let textoABuscar = document.getElementById("textoABuscar").value.toLowerCase();
    let listaFiltrada = listaTipos.filter((tipo) =>
        tipo.nombre.toLowerCase().includes(textoABuscar));
    pintarTabla(listaFiltrada);
}