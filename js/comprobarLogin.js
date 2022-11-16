var usuario = "";

function cargarUsuario() {
    if (localStorage.getItem("sesion")) {
        usuario = localStorage.getItem("sesion");


        if (usuario == "admin") {
            document.getElementById("sesion").innerHTML = `${usuario}`;
            document.getElementById("sesion").style.background = "blue";
            document.getElementById("invisible").style.display = "block";

        }else{
            console.log("dato erroneo "+ usuario);
            document.getElementById("sesion").innerHTML = `${usuario}`;
            document.getElementById("invisible").style.display = "block";
        }


       
       
    }else{
        alert("Tiene que logearse para acceder a la pagina");
        location.href = "./logeo.html";
    }
    
}
function desloguearse() {
    localStorage.removeItem('sesion');
    location.href ="logeo.html";
}

