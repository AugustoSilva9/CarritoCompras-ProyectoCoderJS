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
let productos = [];
let carrito = [];
let dolar = [];

class Producto {
    constructor(id, nombre, precio, categoria, stock = true){
        this.id = parseInt(id);
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio).toFixed(2);
        this.categoria = categoria.toUpperCase();
        this.precioIva = parseFloat(precio * 1.21);
        this.stock = stock;
        this.carrito = parseInt(0);
    }
    sumarIva() {
        this.precioIva = (this.precio * 1.21);
    }
    cambiarStock(){
        this.stock = !this.stock;
    }
}

productos.push(new Producto(1, "Moto G60", 50000, "CELULAR"));
productos.push(new Producto(2, "A22", 45000, "CELULAR"));
productos.push(new Producto(3, "Moto G100", 89000, "CELULAR"));
productos.push(new Producto(4, "Notebook Lenovo", 195000, "NOTEBOOK"));
productos.push(new Producto(5, "LG80", 45000, "SMARTWATCH"));
productos.push(new Producto(6, "IPHONE 13", 300000, "CELULAR"));