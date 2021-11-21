// JAVASCRIPT VANILLA
// ESTE ARCHIVO CONTROLA EL SISTEMA DE LOGIN (UNA ESPECIE DE LOGIN SIMULADO)
// CLASE PARA MANEJAR OBJETO USUARIO
class Usuario {
    constructor(correo, contraseña, nombre) {
        this.correo = correo;
        this.contraseña = contraseña;
        this.nombre = nombre;
    }
}
// MINI SISTEMA PARA NAVEGAR
let register = document.getElementById("register");
let login = document.getElementById("login");
let restore = document.getElementById("restore");
SetRegister();
CheckSession();

function CheckSession() {
    if (localStorage.getItem("logged") == "true") {
        window.location.replace("index.html");
    }
}
// MODIFICA DOM PARA MODO REGISTRACION
function SetRegister() {
    login.style.display = "none";
    restore.style.display = "none";
    register.style.display = "flex";
}
// MODIFICA DOM PARA LOGEARSE
function SetLogin() {
    login.style.display = "flex";
    restore.style.display = "none";
    register.style.display = "none";
}
// MODIFICA DOM PARA RECUPERAR CONTRASEÑA
function SetRestore() {
    login.style.display = "none";
    restore.style.display = "flex";
    register.style.display = "none";
}
//AL PRESIONAR EL BOTON REGISTRAR
function SaveRegister() {
    // OBTENGO VALORES DESDE FORMULARIO
    let nombre = document.getElementById("register-name");
    let correo = document.getElementById("register-email");
    let contraseña = document.getElementById("register-password");
    // SI NO ESTAN VACIOS
    if (nombre.value != "" && correo.value != "" && contraseña.value != "") {
        // ASIGNO LOS DATOS A UN NUEVO USUARIO
        let user = new Usuario(correo.value, contraseña.value, nombre.value)
            // CONVIERTO EN JSON Y GUARDO EN LOCAL STORAGE
        localStorage.setItem("session", JSON.stringify(user));
        document.getElementById("register__warning").style.display = "none";
        SetLogin();
    } else {
        document.getElementById("register__warning").style.display = "block";
        localStorage.setItem("logged", "false");
    }
};
// AL PRESIONAR BOTON LOGIN
function Login() {
    // OBTENGO VALORES DESDE FORMULARIO
    let nombre = document.getElementById("login-email");
    let contraseña = document.getElementById("login-password");
    if (nombre.value != "" && contraseña.value != "") {
        let data = JSON.parse(localStorage.getItem("session"));
        if (data != null) {
            if (nombre.value == data.correo && contraseña.value == data.contraseña) {
                document.getElementById("login__warning").style.display = "none";
                localStorage.setItem("logged", "true");
                CheckSession();
            } else {
                document.getElementById("login__warning").textContent = "Datos incorrectos";
                document.getElementById("login__warning").style.display = "block";
                localStorage.setItem("logged", "false");
            }
        }
    } else {
        document.getElementById("login__warning").style.display = "block";
        document.getElementById("login__warning").textContent = "Ingresa los datos";
    }
}
// AL PRESIONAR BOTON RECUPERAR CONTRASEÑA
function Restore() {
    // OBTENGO VALORES DESDE FORMULARIO
    let correo = document.getElementById("restore-email");
    let pass = document.getElementById("restore-password");
    let data = JSON.parse(localStorage.getItem("session"));
    if (data) {
        if (correo.value) {
            if (data.correo == correo.value) {
                pass.textContent = data.contraseña;
                pass.style.display = "block";
                document.getElementById("restore__warning").style.display = "none";
            } else {
                pass.style.display = "none";
                document.getElementById("restore__warning").textContent = "Usuario no registrado";
                document.getElementById("restore__warning").style.display = "block";

            }
        } else {
            pass.style.display = "none";
            document.getElementById("restore__warning").textContent = "Ingrese los datos solicitados";
            document.getElementById("restore__warning").style.display = "block";
        }
    } else {
        pass.style.display = "none";
        document.getElementById("restore__warning").style.display = "block";
        document.getElementById("restore__warning").textContent = "Usuario no registrado";
    }
}