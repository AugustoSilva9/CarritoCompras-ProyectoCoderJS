let codigo = document.getElementById('codigo');
let descripcion = document.getElementById('descripcion');
let cantidad = document.getElementById('cantidad');
let precio = document.getElementById('precio');
let cargar = document.getElementById('cargar');
let seccionProd = document.getElementById('productos')
let buscar = document.getElementById('busqueda')
let carritoSeccion = document.getElementById('carrito')
let nroCarrito = document.getElementById('nroCarrito')
let iconoCarrito = document.getElementById('iconoCarrito')
let paginaCompleta = document.getElementById('paginaCompleta')
let carritoCompleto = document.getElementById('carritoCompleto')
let inicio = document.getElementById('inicio')
let continuarCompra = document.getElementById('continuarCompra')
let cuerpoModal = document.getElementById('cuerpoModal')
let celulares = document.getElementById('celulares')
let notebook = document.getElementById('notebook')
let smartwatch = document.getElementById('smartwatch')
let tituloSeccionDeProducos = document.getElementById('tituloSeccionDeProducos')
let metodoDePago = document.getElementById('metodoDePago')
let finalCompra = document.getElementById('finalCompra');
let productos = [];
let carrito = [];
let dolar = [];
let productosALaVista = [];
let totalEnPesos = 0;
let totalEnDolar = 0;

class Producto {
    constructor(id, nombre, precio, categoria, imagen){
        this.id = parseInt(id);
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio).toFixed(2);
        this.categoria = categoria.toUpperCase();
        this.precioIva = parseFloat(precio * 1.21);
        this.img = imagen;
        this.carrito = parseInt(0);
    }
    sumarIva() {
        this.precioIva = (this.precio * 1.21);
    }
    cambiarStock(){
        this.stock = !this.stock;
    }
}

productos.push(new Producto(1, "Moto G60", 50000, "CELULAR", './img/motoG60.png'));
productos.push(new Producto(2, "A22", 49000, "CELULAR", './img/samsungA22.jpg'));
productos.push(new Producto(3, "Moto G100", 89000, "CELULAR", './img/motoG100.png'));
productos.push(new Producto(4, "Notebook Lenovo", 132000, "NOTEBOOK", './img/lenovoIdeapad3.jpg'));
productos.push(new Producto(5, "Xiaomi Amazfit", 11000, "SMARTWATCH", './img/xiaomiAmazfit.jpg'));
productos.push(new Producto(6, "IPHONE 13", 300000, "CELULAR", './img/iphone13.jpg'));
productos.push(new Producto(7, "IPHONE 12", 250000, "CELULAR", './img/iphone12.jpg'));
productos.push(new Producto(8, "Notebook Acer Nitro5", 240000, "NOTEBOOK", './img/acerNitro5.jpg'));
productos.push(new Producto(9, "A52", 72000, "CELULAR", './img/samsungA52.jpg'));
productos.push(new Producto(10, "Xiaomi Mi Band6", 6400, "SMARTWATCH", './img/xiaomiMiBand6.jpg'));
productos.push(new Producto(11, "Notebook HP15", 125000, "NOTEBOOK", './img/hp15.jpg'));
productos.push(new Producto(12, "Xiaomi Mi Watch2", 13000, "SMARTWATCH", './img/xiaomiMiWatch2.jpg'));