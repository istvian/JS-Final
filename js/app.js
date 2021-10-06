class Producto {
    constructor(nombre, precio, img, detalle) {
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.detalle = detalle;
    }
}
class Carrito {
    constructor() {
        this.items = new Array();
    }
    addItem(item) {
        this.items.push(item);
        console.log(`Se ha agregado a carrito ${item.nombre}`);
        alert(`Se ha agregado al carrito ${item.nombre}`)
    }
    removeItem(item) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].nombre == item.nombre) {
                this.items.splice(i, 1);
                alert(`Se ha eliminado del carrito ${item.nombre}`)
            } else {
                alert(`No hay elementos ${item.nombre}`)
            }
        }
    }
    allItems() {
        return this.items;
    }
}

OnInit();
let carro = new Carrito();

function OnInit() {
    let btn_add = Array.from(document.getElementsByClassName("item__add"));
    let btn_remove = Array.from(document.getElementsByClassName("item__remove"));
    btn_add.forEach(element => {
        element.addEventListener("click", function() {
            let nombre = element.parentNode.firstElementChild.textContent;
            let precio = element.parentNode.children[3].textContent;
            let img = element.parentNode.children[1].src;
            let detalle = element.parentNode.children[2].textContent;
            carro.addItem(new Producto(nombre, precio, img, detalle))
        })
    });
    btn_remove.forEach(element => {
        element.addEventListener("click", function() {
            let nombre = element.parentNode.firstElementChild.textContent;
            let precio = element.parentNode.children[3].textContent;
            let img = element.parentNode.children[1].src;
            let detalle = element.parentNode.children[2].textContent;
            carro.removeItem(new Producto(nombre, precio, img, detalle))
        })
    });
}