/* let codigo = document.getElementById('codigo');
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
//crear clase producto
let productos = [];
let carrito = [];

class Producto {
    constructor(id, nombre, precio, cantidad, stock = true){
        this.id = parseInt(id);
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
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

productos.push(new Producto(1, "Moto G60", 50000, 3));
productos.push(new Producto(2, "A22", 45000, 6));
productos.push(new Producto(3, "Moto G100", 89000, 0));
productos.push(new Producto(4, "Notebook Lenovo", 195000, 1)); */
/* let dolar = [] */
/* function actualizarStorage(){
    if(!localStorage.getItem("listaDeProductos")){
        localStorage.setItem("listaDeProductos", JSON.stringify(productos))
    } else{
        productos = JSON.parse(localStorage.getItem("listaDeProductos"));
    }
}
actualizarStorage();

function carritoStorage(){
    if(!localStorage.getItem("carrito")){
        localStorage.setItem("carrito", JSON.stringify(carrito))
    } else{
        carrito = JSON.parse(localStorage.getItem("carrito"));
        console.log(carrito)
    }
}
carritoStorage(); */
//imprimir las card de los productos
function crearCard (producto){
    let card = document.createElement('div')
    card.innerHTML = `<img src="http://starcomputacion.com.ar/library/timthumb/timthumb.php?src=/imagenes/productos/21229907306084a6309f807_4.jpg&w=366&h=297&zc=2" alt="">
    <h3>${producto.nombre}</h3>
    <p>Precion: $${producto.precio}</p>
    <p>Precio + IVA: $${producto.precioIva}</p>
    <p>Cantidad disponible ${producto.cantidad}</p>
    <button id="prod-${producto.id}" class="btnCompra">Comprar</button>
    <div id="cantidad-${producto.id}" class="cantidadProd oculto"><button id="menos-${producto.id}">-</button><input type="number" readonly id="cant-${producto.id}" value="1"><button id="mas-${producto.id}">+</button></div>`//en el input de la cantidad tendria que ir producto.carrito
    card.classList.add('card')
    seccionProd && seccionProd.append(card);
}
function controlProductos(carrito, productos){
    if(carrito.length == 0){
        for (const el of productos) {
            el.carrito = 0;
        }
    }else{
        for (const prod of carrito) {
                for (const el of productos) {
                if(prod.id == el.id){
                    el.carrito = prod.carrito;
                    console.log(prod.carrito)
                    console.log(el.carrito)
                }
            }//poner una bandera que cambie si lo encuentra y modifica .carito sino lo reseteo
        }
    }
    console.log(carrito)
    console.log(productos)
}
function imprimir(productos) {
    controlProductos(carrito, productos)
    seccionProd.innerHTML = "";
    for (const producto of productos) {       
        crearCard(producto)
        eventoMasMenosCantidad(producto)
        if(producto.carrito != 0){
            console.log('prueba')
            let input = document.getElementById(`cant-${producto.id}`);
            input.value = producto.carrito;
            btnCantidad(producto.id, false)
        }
    }
    eventoComprar(productos)
}

// tomo los valores que pone el usuario creo el producto y lo pusheo al array productos
/* function cargarProd(){
        let id = codigo.value;
        let nombre = descripcion.value;
        let pcio = precio.value;
        let cant = cantidad.value;
        let stock = true;
        productos.push(new Producto(id, nombre, pcio, cant, stock));
        seccionProd.innerHTML = "";
        limpiar();
        localStorage.setItem("listaDeProductos", JSON.stringify(productos))
        actualizarStorage();
        imprimir(productos);

} */

const valorDolar = async () => {
    const resp = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
    const data = await resp.json();
    console.log(data) 
    dolar.push(...data)
    let valor
    for (const el of dolar) {
        el.casa.nombre == "Dolar Blue" && (valor = el.casa.venta)
    }
    return valor   
}

//funciones del carrito

function calcularTotal(carrito){
   const total = carrito.reduce((acc, el) => acc + (el.precioIva * el.carrito), 0)
    return total;
}
async function totalEnDolares (tot){
    console.log(tot);
    const dolar = await valorDolar();
    console.log(dolar.replace(',','.'))
    let dolarParseado = dolar.replace(',','.')
    dolarParseado = parseFloat(dolarParseado)
    let totalUSD = (tot / parseFloat(dolarParseado));
    totalUSD = totalUSD.toFixed(2);
    console.log(totalUSD)
    return totalUSD 
}

function eliminarCarrito(prod){
   const eliminarProd = carrito.findIndex((el) => el.id === prod.id)
   carrito.splice(eliminarProd, 1)
   prod.carrito = 0;
   let input = document.getElementById(`cant-${prod.id}`);
   input.value = prod.carrito
   localStorage.setItem("carrito", JSON.stringify(carrito))
   carritoStorage();
   paginaCompleta.classList.contains('oculto') && mostrarCarrito(carrito) 
   for (const el of productos) {
       if(el.id == prod.id){
           el.carrito = 0;
       }
   }
   console.log(carrito)
   console.log(prod)
   notificacionCarrito()
}

function eventoEiminarCarrito(carrito){
    for (const producto of carrito) {
        document.getElementById(`eliminar-${producto.id}`).addEventListener('click', ()=> {
            eliminarCarrito(producto)
            btnCantidad(producto.id)
            notificacionCarrito()
        })
    }
}
function imprimirCarrito (carrito){
    for (const prod of carrito) {
        let prodCarrito = document.createElement('div')
        prodCarrito.innerHTML = `<h3 class="w-33">${prod.nombre}</h3> 
                                <p class="w-33">$${prod.precioIva}</p> 
                                <p id="cantEnCarrito-${prod.id}"class="w-33">${prod.carrito}</p>
                                <button id="eliminar-${prod.id}" value="${prod.id}">Eliminar</button>`;
        carritoSeccion.append(prodCarrito);
        prodCarrito.classList.add('carritoItem')
    }
}

async function totalCarrito(carrito){
    let totalC = calcularTotal(carrito)
    let total = document.createElement('div');
    total.innerHTML = `<h3 class="w-33">TOTAL</h3>
    <p class="w-33">${totalC}</p>`;
    
    let totalUDS = await totalEnDolares(totalC)
    let totalDolar = document.createElement('div');
    totalDolar.innerHTML = `<h3 class="w-33">TOTAL UDS</h3>
    <p class="w-33">${totalUDS}</p>`
    console.log(totalUDS)
    
    carritoSeccion.append(total);
    total.classList.add('carritoItem')
    carritoSeccion.append(totalDolar);
    totalDolar.classList.add('carritoItem')
}
async function mostrarCarrito(carrito){
    carritoSeccion && (carritoSeccion.innerHTML = '') ;
    if(carrito.length == 0){
        carritoSeccion.innerHTML = `<h3>Tu carrito esta vacio</h3>`
    }
    imprimirCarrito(carrito)
    await totalCarrito(carrito)
    eventoEiminarCarrito(carrito)
    mostrarOcultarCarrito(true)
}
//le paso la cantidad y agrego el producto al carrito 
function cantidadCarritoModif (producto, modificacion=true){
    let cantModificada = producto.carrito;
    modificacion ? cantModificada++ : cantModificada--;
    producto.carrito = parseInt(cantModificada);
}

function agregarACarrito(producto){
    cantidadCarritoModif(producto)
    console.log(producto)
    carrito.push(producto)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    carritoStorage();
    console.log(carrito)
  //  mostrarCarrito(carrito)
}

//asigno el click a los botones y llamo a la funcion que agrega al carrito
const eventoComprar = (productos) => {
    for (const producto of productos) {
        document.getElementById(`prod-${producto.id}`).addEventListener('click', () => {
            Toastify({
                text: "tu producto se agrego al carrito",
                duration: 2000,
                gravity: 'bottom',
                style: {
                    background: "red",
                  }
                }).showToast();
            producto.carrito = 0;    
            agregarACarrito(producto);
            btnCantidad(producto.id)
            let input = document.getElementById(`cant-${producto.id}`);
            input.value = producto.carrito
            notificacionCarrito()
        })
    }
}
// funcion botones mas menos falta ver como oculto cuando dice 1 sin mostrar el 0
function checkCantidad(prod, sumaResta) {
    let checkCantidad = carrito.find((el) => el.id === prod.id) ;
    sumaResta ? (checkCantidad.carrito++) : (checkCantidad.carrito--) ;
    let cantidad = checkCantidad.carrito;
    console.log(cantidad)
    return cantidad
}

function masMenosCantidad ( producto, sumaResta){
    let input = document.getElementById(`cant-${producto.id}`);
    producto.carrito = checkCantidad(producto, sumaResta);
    console.log(producto)
    console.log(producto.carrito)
    let cantidad = parseInt(producto.carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito))
    carritoStorage();
    if(cantidad === 0){
        //cambio el +/- por el boton comprar y elimino el elemento del carrito
        input.value = cantidad;
        btnCantidad(producto.id)
        eliminarCarrito(producto)
    }else{
        input.value = cantidad;
        console.log(input.value + ' else')
    }
}

const eventoMasMenosCantidad = (producto) => {   
        document.getElementById(`mas-${producto.id}`).addEventListener('click', () => {masMenosCantidad(producto, true)})
        document.getElementById(`menos-${producto.id}`).addEventListener('click', () => {masMenosCantidad(producto, false)})
}

function btnCantidad(id, cambio = true){
    let btnCompra = document.getElementById(`prod-${id}`)
    let btnCantidad = document.getElementById(`cantidad-${id}`)
    if(btnCantidad.classList.contains('oculto')){
        btnCompra.classList.add('oculto')
        btnCantidad.classList.remove('oculto')
    }else{
        btnCompra.classList.remove('oculto')
        btnCantidad.classList.add('oculto')
    }
    if(cambio == false){
        btnCompra.classList.add('oculto')
        btnCantidad.classList.remove('oculto')
    }
    
}



if(iconoCarrito){
    iconoCarrito.addEventListener('click',() => {
    mostrarCarrito(carrito)
})
}
// filtrar los productos que quiero ver
if(buscar){
buscar.addEventListener('input', (e) => {
    //ver como limpiar el filtro si input.length = 0 filtro= []vacio
    let prodABuscar = e.target.value;
    prodABuscar = prodABuscar.toUpperCase();
    let filtro = productos.filter((prod) => prod.nombre.includes(prodABuscar));
    seccionProd.innerHTML = "";
    console.log(filtro)
    console.log(productos)
    console.log(prodABuscar.length)
    prodABuscar.length == 0 ? imprimir(productos) : imprimir(filtro);
    
})
}

console.log(productos);
console.log(carrito);

imprimir(productos)
//mostrar el numero de productos que hay en el carrito en el icono
const notificacionCarrito = () => {
    nroCarrito.innerHTML = carrito.length;
}
notificacionCarrito()

function mostrarOcultarCarrito(accion) {
    if(accion == true){
        paginaCompleta.classList.add('oculto')
        carritoCompleto.classList.remove('oculto')
    }else{
        paginaCompleta.classList.remove('oculto')
        carritoCompleto.classList.add('oculto')
    }
}

inicio.addEventListener('click', () => {mostrarOcultarCarrito(false)}) 

//el final de la compra con un modal
finalCompra.addEventListener('click', mostrarMetodosPago)

function mostrarMetodosPago(){
    let contenedorMetodos = document.createElement('div');
    contenedorMetodos.innerHTML = `<div>Pago en efectivo $</div>
                                    <div>Pago en US$</div>
                                    <div>Pago por transferencia</div>`
    cuerpoModal.append(contenedorMetodos)
}

//Mostrar las diferentes categorias de productos
function mostrarCategoria(cat){
    console.log(cat)
    let categoriaAMostrar = productos.filter((el) => el.categoria == cat)
    console.log(categoriaAMostrar)
    imprimir(categoriaAMostrar)

}

celulares.addEventListener('click', () => {
    let cat = 'CELULAR'
    mostrarCategoria(cat)
})

notebook.addEventListener('click', () => {
    let cat = 'NOTEBOOK'
    mostrarCategoria(cat)
})
smartwatch.addEventListener('click', () => {
    let cat = 'SMARTWATCH'
    mostrarCategoria(cat)
})
//---------------------------------------------------------
/* const busqueda = productos.filter((el) => el.nombre.includes(`MOTO`));
console.log(`Busqueda de productos que contengan MOTO en el nombre ${JSON.stringify(busqueda)}`);

const valor = productos.filter((el) => el.precio <= 100000);
console.log(`Productos de menos de $100000 de costo ${JSON.stringify(valor)}`);

valor.forEach((el) => {console.log(el.nombre , el.precio)})

const faltantes = productos.filter((el) => el.stock == false);
console.log(`faltante ${JSON.stringify(faltantes)}`)

*/