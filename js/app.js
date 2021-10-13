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