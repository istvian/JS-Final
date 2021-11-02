// MENU HAMBURGUESA MOVIL
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

// AL SELECCIONAR UNA REGION
let reg_sel = $("#region-selector");
reg_sel.change((e) => {
    if (reg_sel.val() != 0) {
        LoadCity(reg_sel.val());
        SaveRegion(reg_sel.val())
    }
});
// AL SELECCIONAR UNA CIUDAD
let city_sel = $("#city-selector");
city_sel.change((e) => {
    if (city_sel.val() != 0) {
        LoadData(String(city_sel.children()[city_sel.val()].text).toUpperCase());
        SaveCiudad(String(city_sel.children()[city_sel.val()].text).toUpperCase(), city_sel.val());
    }
});


function ClearData() {
    $("#farmacia-container").fadeOut();
}
ClearData();
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
// CARGA LOS DATOS DE LA FARMACIA AL DOM
async function LoadData(ciudad) {
    await $.getJSON("https://raw.githubusercontent.com/istvian/JS-Final/master/farmacias.json", function(respuesta, estado) {
        if (estado === "success") {
            let data = respuesta;
            let result = data.find(e => e.comuna_nombre == ciudad)
            if (result) {
                $("#farmacia-container").fadeIn();
                $("#farmacia-nombre").text(result.local_nombre);
                $("#farmacia-hora").text(`Horario: ${String(result.funcionamiento_hora_apertura).slice(0,5)} a ${String(result.funcionamiento_hora_cierre).slice(0,5)}`);
                $("#farmacia-direccion").text(result.local_direccion);
                $("#farmacia-call").attr("href", `Tel:${result.local_telefono}`);
                $("#farmacia-geo").attr("href", `https://maps.google.com/?q=${result.local_lat},${result.local_lng}`)
            } else {
                ClearData();
            }
        }
    })
}

function SaveRegion(region) {
    localStorage.setItem("region", region);

}

function SaveCiudad(ciudad, id) {
    localStorage.setItem("ciudad", ciudad);
    localStorage.setItem("id", id);
}

async function LoadStorage() {
    if (localStorage.getItem("region") != null && localStorage.getItem("ciudad") != null) {
        reg_sel.val(localStorage.getItem("region"));
        await LoadCity(localStorage.getItem("region"));
        await LoadData(localStorage.getItem("ciudad"));
        city_sel.val(localStorage.getItem("id"));
    }
}
// CHEQUEA SI TIENE DATOS DEL USUARIO
LoadStorage();