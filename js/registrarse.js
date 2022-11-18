var listaPokeUsuarios = [];
cargarPokeUsuarios();

function cargarPokeUsuarios() {
    if (localStorage.getItem("usuarios")) listaPokeUsuarios = JSON.parse(localStorage.getItem("usuarios"));
    
}

function crearUsuario() {
    var cajaUsuario = document.getElementById("usuario").value;
    var cajaClave = document.getElementById("clave").value;

    var Usuario = {
        "nombre": cajaUsuario,
        "clave": cajaClave,
    }
    
    if (cajaUsuario != "" && cajaClave !="") {
        listaPokeUsuarios.push(Usuario);
        localStorage.setItem("usuarios", JSON.stringify(listaPokeUsuarios));
        location.href = "./logeo.html";
    }else{
        alert("Los campos tienen que estar rellenos para poder crear el usuario");
    }
    
}

