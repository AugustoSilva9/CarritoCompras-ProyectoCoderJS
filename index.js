let codigo = document.getElementById('codigo');
let descripcion = document.getElementById('descripcion');
let cantidad = document.getElementById('cantidad');
let precio = document.getElementById('precio');
let cargar = document.getElementById('cargar');
let seccionProd = document.getElementById('productos')
let buscar = document.getElementById('busqueda')
let carritoSeccion = document.getElementById('carrito')

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
        this.carrito = 0;
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
            <button id="prod-${producto.id}" class="btnCompra">Comprar</button>
            <div id="cantidad-${producto.id}" class="cantidadProd oculto"><button>-</button><input type="number" readonly value="1"><button>+</button></div>`
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

//funciones del carrito
let carrito = [];


function totalCarrito(carrito){
   const total = carrito.reduce((acc, el) => acc + el.precioIva, 0)
    return total;
}

function EliminarCarrito(valor){
   const eliminarProd = carrito.findIndex((el) => el.id === valor)
   console.log(eliminarProd)
   carrito.splice(eliminarProd, 1)
   mostrarCarrito(carrito) 
}

function eventoEiminarCarrito(carrito){
    for (const producto of carrito) {
        document.getElementById(`eliminar-${producto.id}`).addEventListener('click', (e)=> {
        let prodBorrar = parseInt(e.target.value);
        console.log(prodBorrar)
        EliminarCarrito(prodBorrar)
        btnCantidad(producto)
    })
    }
    
}

function mostrarCarrito(carrito){
    carritoSeccion.innerHTML = '';
    for (const prod of carrito) {
        let prodCarrito = document.createElement('div')
        prodCarrito.innerHTML = `<h3 class="w-33">${prod.nombre}</h3> 
                                <p class="w-33">$${prod.precioIva}</p> 
                                <p class="w-33">${prod.carrito}</p>
                                <button id="eliminar-${prod.id}" value="${prod.id}">Eliminar</button>`;
        carritoSeccion.append(prodCarrito);
        prodCarrito.classList.add('carritoItem')
    }
    eventoEiminarCarrito(carrito)
    let totalC = totalCarrito(carrito)
    let total = document.createElement('div');
    total.innerHTML = `<h3 class="w-33">TOTAL</h3>
    <p class="w-33">${totalC}</p>`;
    carritoSeccion.append(total);
    total.classList.add('carritoItem')
}
//le paso la cantidad y agrego el producto al carrito 
function agregarACarrito(producto){
    let cantidadcarrito = 1;
    producto.carrito = cantidadcarrito;
    carrito.push(producto)
    console.log(carrito[(carrito.length - 1)].nombre , carrito[(carrito.length - 1)].carrito )
    console.log(carrito);
    mostrarCarrito(carrito)
}


//asigno el click a los botones y llamo a la funcion que agrega al carrito
const eventoComprar = (productos) => {
    for (const producto of productos) {
        document.getElementById(`prod-${producto.id}`).addEventListener('click', () => {
            console.log(producto);
            let ocultarBtn = document.getElementById(`prod-${producto.id}`)
           btnCantidad(producto)
            agregarACarrito(producto);
        })
    }
}

function btnCantidad({id}){
    const btnCompra = document.getElementById(`prod-${id}`)
    const btnCantidad = document.getElementById(`cantidad-${id}`)
    if(btnCantidad.classList.contains('oculto')){
        btnCompra.classList.add('oculto')
        btnCantidad.classList.remove('oculto')
    }else{
        btnCompra.classList.remove('oculto')
        btnCantidad.classList.add('oculto')
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

cargar.addEventListener('click', cargarProd)
console.log(productos);

imprimir(productos)

//---------------------------------------------------------
/* const busqueda = productos.filter((el) => el.nombre.includes(`MOTO`));
console.log(`Busqueda de productos que contengan MOTO en el nombre ${JSON.stringify(busqueda)}`);

const valor = productos.filter((el) => el.precio <= 100000);
console.log(`Productos de menos de $100000 de costo ${JSON.stringify(valor)}`);

valor.forEach((el) => {console.log(el.nombre , el.precio)})

const faltantes = productos.filter((el) => el.stock == false);
console.log(`faltante ${JSON.stringify(faltantes)}`)

 */