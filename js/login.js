var listaPokeUsuarios = [];
cargarPokeUsuarios();

function cargarPokeUsuarios() {
    if (localStorage.getItem("usuarios")) listaPokeUsuarios = JSON.parse(localStorage.getItem("usuarios"));
    
}

// function comprobarUsuario() {
//     var cajaUsuario = document.getElementById("usuario");
//     var cajaClave = document.getElementById("clave");

//     if (listaPokeUsuarios.filter((elemento) => elemento.nombre == cajaUsuario.value &&
//             elemento.clave == cajaClave.value).length != 0) {
//         localStorage.setItem("sesion",elemento);
//         location.href = "./index.html";
//     } else {
//         document.getElementById("error").style.display = "block";
//     }
// }

function comprobarUsuario() {
    var cajaUsuario = document.getElementById("usuario");
    var cajaClave = document.getElementById("clave");


    if(listaPokeUsuarios.length != 0){
        listaPokeUsuarios.forEach((usuario) => {
            if(usuario.nombre == cajaUsuario.value && usuario.clave == cajaClave.value){
                localStorage.setItem("sesion", usuario.nombre);
            }
        });
        if(localStorage.getItem("sesion")){
            location.href = "./index.html";
        }
        else{
            alert("Usuario o clave incorrectas");
        }
    }else document.getElementById("error").style.display = "block";

}

function quitarError() {
    document.getElementById("error").style.display = "none";
}