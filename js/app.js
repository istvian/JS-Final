class Local {
    constructor(fecha, local_id, local_nombre, comuna_nombre, localidad_nombre, local_direccion, funcionamiento_hora_apertura, funcionamiento_hora_cierre, local_telefono, local_lat, local_lng, funcionamiento_dia, fk_region, fk_comuna, fk_localidad) {
        this.fecha = fecha,
            this.local_id = local_id,
            this.local_nombre = local_nombre,
            this.comuna_nombre = comuna_nombre,
            this.localidad_nombre = localidad_nombre,
            this.local_direccion = local_direccion,
            this.funcionamiento_hora_apertura = funcionamiento_hora_apertura,
            this.funcionamiento_hora_cierre = funcionamiento_hora_cierre,
            this.local_telefono = local_telefono,
            this.local_lat = local_lat,
            this.local_lng = local_lng,
            this.funcionamiento_dia = funcionamiento_dia,
            this.fk_region = fk_region,
            this.fk_comuna = fk_comuna,
            this.fk_localidad = fk_localidad
    }
};

// MENU HAMBURGESA
let btn = document.getElementById("menu-btn");
let menu = document.getElementById("menu");
let link = Array.from(document.getElementsByClassName("link"));
link.forEach(element => {
    element.onclick = function name(params) {
        if (menu.className == "nav__links") {
            menu.className = "menu__hide";
            menu.style.display = "none";
        }
    }
});
btn.onclick = () => {
    if (menu.className == "menu__hide") {
        menu.style.display = "flex";
        menu.className = "nav__links";
    } else {
        menu.className = "menu__hide";
        menu.style.display = "none";
    }
};

// FUNCIONALIDAD PAGINA

let region_selector = document.getElementById("region-selector");
let city_selector = document.getElementById("city-selector");
let f_nombre = document.getElementById("farmacia-nombre");
let f_hora = document.getElementById("farmacia-hora");
let f_direccion = document.getElementById("farmacia-direccion");
let f_call = document.getElementById("farmacia-call");
let f_geo = document.getElementById("farmacia-geo");
let farmacias = new Array();
let regiones = new Array();
GetComunas();
GetFarmacias();
// CUANDO SE SELECCIONA UNA REGION
region_selector.onchange = () => {
    // ELIMINA LAS CIUDADES O COMUNAS
    ClearFarmacia();
    while (city_selector.hasChildNodes()) {
        city_selector.removeChild(city_selector.childNodes[0]);
    }
    // SI NO ELIGE NINGUNA REGION OCULTA LAS CIUDADES
    if (region_selector.value == 0) {
        city_selector.style.display = "none";
    } else {
        // LO MUESTRA, AGREGA LA OPCION 0
        city_selector.style.display = "flex";
        let option = new Option("Selecciona una ciudad", 0);
        city_selector.appendChild(option);
        // AGREGA LAS CIUDADES EN QUE CORRESPONDEN CON LA REGION
        // let result = regiones.find(e => e.numero == region_selector.value);
        // for (let i = 0; i < result.comunas.length; i++) {
        //     let option = new Option(result.comunas[i], i + 1);
        //     city_selector.appendChild(option);
        // }
        let result = farmacias.filter(e => e.fk_region == region_selector.value);
        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                let option = new Option(String(result[i].comuna_nombre).toUpperCase(), i + 1);
                city_selector.appendChild(option);
            }
        } else {
            let option = new Option("Sin datos", "0");
            city_selector.appendChild(option);
        }

    };
};

function ClearFarmacia() {
    f_nombre.textContent = "Nombre: ";
    f_hora.textContent = `Horario: `;
    f_direccion.textContent = `Dirección: `;
    f_call.href = `#`;
    f_geo.href = `#`;
}

city_selector.onchange = () => {
    ClearFarmacia();
    let result = farmacias.find(e => e.comuna_nombre == city_selector.childNodes[city_selector.value].textContent.toUpperCase());
    if (result != null) {
        f_nombre.textContent = `Nombre: ${result.local_nombre}`;
        f_hora.textContent = `Horario: ${String(result.funcionamiento_hora_apertura).slice(0,5)} a ${String(result.funcionamiento_hora_cierre).slice(0,5)}`
        f_direccion.textContent = `Dirección: ${result.local_direccion}`;
        f_call.href = `Tel:${result.local_telefono}`;
        f_geo.href = `https://maps.google.com/?q=${result.local_lat},${result.local_lng}`;
    }
}

function SetFarmacia(json) {
    farmacias = JSON.parse(json);
}

function SetComunas(json) {
    regiones = JSON.parse(json);
}

function GetFarmacias() {
    var req = new XMLHttpRequest();
    // req.open('GET', "https://farmanet.minsal.cl/index.php/ws/getLocalesTurnos", true);
    req.open('GET', "https://raw.githubusercontent.com/istvian/JS-Final/master/farmacias.json", true);
    req.onload = function() {
        var jsonResponse = req.response;
        // console.log(jsonResponse);
        SetFarmacia(jsonResponse);
    };
    req.send(null);
};

function GetComunas() {
    var req = new XMLHttpRequest();
    // req.responseType = 'json';
    req.open('GET', "https://raw.githubusercontent.com/istvian/JS-Final/master/regiones.json", true);
    req.onload = function() {
        var jsonResponse = req.response;
        SetComunas(jsonResponse);
    };
    req.send(null);
};