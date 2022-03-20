let codigo = document.getElementById('codigo');
let descripcion = document.getElementById('descripcion');
let cantidad = document.getElementById('cantidad');
let precio = document.getElementById('precio');
let cargar = document.getElementById('cargar');
let seccionProd = document.getElementById('productos')
let buscar = document.getElementById('busqueda')


//crear clase producto
let productos = [];


class Producto {
    constructor(id, nombre, precio, cantidad, stock = true){
        this.id = parseInt(id);
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.precioIva = parseFloat(precio * 1.21);
        this.stock = stock;
    }
    sumarIva() {
        this.precioIva = (this.precio * 1.21);
    }
    cambiarStock(){
        this.stock = !this.stock;
    } 
}

productos.push(new Producto(1, "Moto G60", 50000, 3));
productos.push(new Producto(2, "A22", 45000, 6));
productos.push(new Producto(3, "Moto G100", 89000, 0));
productos.push(new Producto(4, "Notebook Lenovo", 195000, 1));

function actualizarStorage(){
    if(!localStorage.getItem("listaDeProductos")){
        localStorage.setItem("listaDeProductos", JSON.stringify(productos))
    } else{
        productos = JSON.parse(localStorage.getItem("listaDeProductos"));
    }
}
actualizarStorage();
//imprimir las card de los productos
const imprimir = (productos) =>{
    for (const producto of productos) {       
        if(producto.stock == true){
            let card = document.createElement('div')
            card.innerHTML = `<h3>${producto.nombre}</h3>
            <p>Precion: $${producto.precio}</p>
            <p>Precio + IVA: $${producto.precioIva}</p>
            <p>Cantidad disponible ${producto.cantidad}</p>
            <button id="prod-${producto.id}" class="btnCompra">Comprar</button>`
            card.classList.add('card')
            seccionProd.append(card);
            
        }else{
            let card = document.createElement('div');
            card.innerHTML = `<h3>${producto.nombre}</h3>
            <p>Precion: $${producto.precio}</p>
            <p>Precio + IVA: $${producto.precioIva}</p>
            <p>(sin stock)</p>
            <button id="prod-${producto.id}" class="btnCompra">Comprar</button>`;
            card.classList.add('card')
            seccionProd.append(card);    
         }
    }
    eventoComprar(productos)
}

// tomo los valores que pone el usuario creo el producto y lo pusheo al array productos
function cargarProd(){
        let id = codigo.value;
        let nombre = descripcion.value;
        let pcio = precio.value;
        let cant = cantidad.value;
        let stock = true;
        if(cant == 0){
            stock = false;
        }
        productos.push(new Producto(id, nombre, pcio, cant, stock));
        seccionProd.innerHTML = "";
        limpiar();
        localStorage.setItem("listaDeProductos", JSON.stringify(productos))
        actualizarStorage();
        imprimir(productos);

}
//reseteo los input 
const limpiar = () => {
    codigo.value = "";
    descripcion.value = "";
    cantidad.value = "";
    precio.value = "";
}

const eventoComprar = (productos) => {
    for (const producto of productos) {
        document.getElementById(`prod-${producto.id}`).addEventListener('click', () => {console.log(producto.nombre)})
    }
}

// filtrar los productos que quiero ver
buscar.addEventListener('input', (e) => {
    let prodABuscar = e.target.value;
    prodABuscar = prodABuscar.toUpperCase();
    const filtro = productos.filter((prod) => prod.nombre.includes(prodABuscar));
    seccionProd.innerHTML = "";
    imprimir(filtro);

})

const mostrarProductos = (productos) => {
/*     for (const producto of productos) {
        producto.sumarIva();
        imprimir(producto);
    } */
    imprimir(productos)
}

cargar.addEventListener('click', cargarProd)
console.log(productos);


mostrarProductos(productos)


//---------------------------------------------------------
const busqueda = productos.filter((el) => el.nombre.includes(`MOTO`));
console.log(`Busqueda de productos que contengan MOTO en el nombre ${JSON.stringify(busqueda)}`);

const valor = productos.filter((el) => el.precio <= 100000);
console.log(`Productos de menos de $100000 de costo ${JSON.stringify(valor)}`);

valor.forEach((el) => {console.log(el.nombre , el.precio)})

const faltantes = productos.filter((el) => el.stock == false);
console.log(`faltante ${JSON.stringify(faltantes)}`)

