//#region MENU HAMBURGESA
let menu = $("#menu");
let isMenu = false;
$(".link").on("click", () => {
    menu.fadeOut(300);
    isMenu = false;
})
$("#menu-btn").on("click", () => {
    if (!isMenu) {
        menu.fadeIn(300);
    } else {
        menu.fadeOut(300);
    }
    isMenu = !isMenu;
});
//#endregion
//#region Objetos
class Farmacia {
    constructor(nombre, hora, direccion, telefono, geo) {
        this.nombre = nombre;
        this.hora = hora;
        this.direccion = direccion;
        this.telefono = telefono;
        this.geo = geo;
    }
}
class UserPref {
    constructor(correo, region, comuna, id) {
        this.correo = correo;
        this.region = region;
        this.comuna = comuna;
        this.id = id;
    }
}
//#endregion

// AL CARGAR LA PAGINA
$(function() {
    ResultBlock(false);
    LoadStorage();
    if (!localStorage.key("logged") || localStorage.getItem("logged") == false) {
        Close();
        window.location.replace("login.html");
    }
});
// AL SELECCIONAR UNA REGION
let reg_sel = $("#region-selector");
reg_sel.change((e) => {
    if (reg_sel.val() != 0) {
        LoadCity(reg_sel.val());
        pref.region = reg_sel.val();
        SaveStorage();
    } else {
        ClearData();
        city_sel.empty();
        city_sel.append($('<option>', {
            value: 0,
            text: "Selecciona una ciudad"
        }));
    }
});
// AL SELECCIONAR UNA CIUDAD
let city_sel = $("#city-selector");
city_sel.change((e) => {
    if (city_sel.val() != 0) {
        ClearData();
        LoadTurno(String(city_sel.children()[city_sel.val()].text).toUpperCase())
        LoadAll(String(city_sel.children()[city_sel.val()].text).toUpperCase());
        pref.comuna = String(city_sel.children()[city_sel.val()].text).toUpperCase();
        pref.id = city_sel.val();
        SaveStorage();
    }
});

// OCULTA O MUESTRA EL BLOQUE DE RESULTADOS
function ResultBlock(state) {
    if (state) {
        $(".result").fadeIn();
    } else {
        $(".result").fadeOut();
    }
}

function ClearData() {
    $("#nombre>span").siblings().remove();
    $("#direccion>span").siblings().remove();
    $("#telefono>span").siblings().remove();
    $("#mapa>span").siblings().remove();
    $("#horario>span").siblings().remove();
}

function NoData() {
    $("#nombre").append(`<div class="result__content empty"><span>Sin datos</span></div>`);
    $("#direccion").append(`<div class="result__content empty"><span>Sin datos</span></div>`);
    $("#horario").append(`<div class="result__content empty"><span>Sin datos</span></div>`);
    $("#telefono").append(`<div class="result__content click empty"><span>Sin datos</span></div>`);
    $("#mapa").append(`<div class="result__content click empty"><span>Sin datos</span></div>`);
}
// CARGA LAS CIUDADES/COMUNAS AL LISTADO
async function LoadCity(option) {
    await $.getJSON("https://raw.githubusercontent.com/istvian/JS-Final/master/regiones.json", function(respuesta, estado) {
        if (estado === "success") {
            let data = respuesta;
            city_sel.empty();
            city_sel.append($('<option>', {
                value: 0,
                text: "Selecciona una ciudad"
            }));
            for (let index = 1; index < data[option - 1].comunas.length; index++) {
                city_sel.append($('<option>', {
                    value: index,
                    text: data[option - 1].comunas[index - 1]
                }));
            }
        }
    })
}
// CARGA LOS DATOS DE TODAS LAS FARMACIAS
async function LoadAll(ciudad) {
    await $.getJSON("https://raw.githubusercontent.com/istvian/JS-Final/master/farmacias-all.json", function(respuesta, estado) {
        if (estado === "success") {
            let data = respuesta;
            let result = data.filter(e => e.comuna_nombre == ciudad);
            // AGREGA LAS FARMACIAS NORMALES
            AddItem(result, "");
        }
    })
}
// CARGA LOS DATOS DE LAS FARMACIAS DE TURNO
async function LoadTurno(ciudad) {
    await $.getJSON("https://raw.githubusercontent.com/istvian/JS-Final/master/farmacias.json", function(respuesta, estado) {
        if (estado === "success") {
            let data = respuesta;
            let result = data.filter(e => e.comuna_nombre == ciudad);
            // AGREGA LAS FARMACIAS DE TURNO
            AddItem(result, "turno");
        }
    })
}
// AGREGA LOS RESULTADOS AL DOM
function AddItem(result, className) {
    if (result.length > 0) {
        result.forEach(element => {
            // SI ES QUE EXISTE
            if (element) {
                // MUESTRA LOS RESULTADOS
                ResultBlock(true);
                // SI ES QUE CONTIENE NOMBRE EL LOCAL
                if (element.local_nombre) {
                    $("#nombre").append(`<div class="result__content ${className}"><span>${element.local_nombre}</span></div>`);
                    // SI ES QUE CONTIENE DIRECCION
                    if (element.local_direccion) {
                        $("#direccion").append(`<div class="result__content ${className}"><span>${element.local_direccion}</span></div>`);
                    } else {
                        $("#direccion").append(`<div class="result__content ${className}"><span>Sin datos</span></div>`);
                    }
                    // SI ES QUE CONTIENE HORARIO
                    if (element.funcionamiento_hora_apertura || element.funcionamiento_hora_cierre) {
                        $("#horario").append(`<div class="result__content ${className}"><span>${String(element.funcionamiento_hora_apertura).slice(0,5)}-${String(element.funcionamiento_hora_cierre).slice(0,5)}</span></div>`);
                    } else {
                        $("#horario").append(`<div class="result__content ${className}"><span>Sin datos</span></div>`);
                    }
                    // SI ES QUE CONTIENE TELEFONO
                    if (element.local_telefono && (element.local_telefono.length > 4 && element.local_telefono.length < 13)) {
                        $("#telefono").append(`<div class="result__content click ${className}"><a href="Tel:${element.local_telefono}">${element.local_telefono}</a></div>`);
                    } else {
                        $("#telefono").append(`<div class="result__content click ${className}"><span>Sin datos</span></div>`);
                    }
                    if (element.local_lat || element.local_lng) {
                        $("#mapa").append(`<div class="result__content click ${className}"><a target="_blank" href="https://maps.google.com/?q=${element.local_lat},${element.local_lng}">Ir al mapa</a></div>`);
                    } else {
                        $("#mapa").append(`<div class="result__content click ${className}"><span>Sin datos</span></div>`);
                    }
                }
            }
        });
    } else {
        ResultBlock(false);
    }
}
// GUARDA LAS PREFERENCIAS DE USUARIO
function SaveStorage() {
    localStorage.setItem("userPref", JSON.stringify(pref));
}
const pref = new UserPref({ correo: JSON.parse(localStorage.getItem("session")).correo });
const user = JSON.parse(localStorage.getItem("session"));
// CHEQUEA SI TIENE PREFERENCIAS DE USUARIO Y LAS CARGA
async function LoadStorage() {
    let pref = JSON.parse(localStorage.getItem("userPref"));
    if (pref) {
        reg_sel.val(pref.region);
        await LoadCity(pref.region);
        await LoadTurno(pref.comuna);
        await LoadAll(pref.comuna);
        city_sel.val(pref.id);
    }
}
// CIERRA SESION
function Close() {
    localStorage.removeItem("logged");
}