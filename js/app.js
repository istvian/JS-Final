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
        if (menu.style.display == "none") {
            menu.style.display = "flex";
        } else {
            menu.style.display = "none";
        }
    }
});
btn.onclick = () => {
    if (menu.style.display == "none") {
        menu.style.display = "flex";
    } else {
        menu.style.display = "none";
    }
};

// FUNCIONALIDAD PAGINA

let region_selector = document.getElementById("region-selector");
let city_selector = document.getElementById("city-selector");
let farmacias = new Array();
let regiones = new Array();
GetFarmacias();
GetComunas();

region_selector.onchange = () => {
    if (city_selector.children.length > 1) {
        for (let i = 1; i < city_selector.length; i++) {
            city_selector.removeChild(city_selector.childNodes[i]);
        }
    }
    for (let index = 0; index < region_selector.childElementCount; index++) {
        console.log(regiones[region_selector.value - 1].region);
        if (region_selector.childNodes[index].textContent == regiones[region_selector.value - 1].region) {
            for (let i = 0; i < regiones[region_selector.value - 1].comunas.length; i++) {
                let option = document.createElement("option");
                option.innerText = regiones[region_selector.value - 1].comunas[i];
                option.value = i;
                city_selector.appendChild(option);
            }
        }
    };
};

function SetFarmacia(json) {
    farmacias = JSON.parse(json);
}

function SetComunas(json) {
    regiones = JSON.parse(json);
}

function GetFarmacias() {
    var req = new XMLHttpRequest();
    // req.responseType = 'json';
    req.open('GET', "http://farmanet.minsal.cl/index.php/ws/getLocalesTurnos", true);
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