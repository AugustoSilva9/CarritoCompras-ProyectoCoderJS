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
productos.push(new Producto(4, "Notebook Lenovo", 195000, 1));

function actualizarStorage(){
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
carritoStorage();
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
            <div id="cantidad-${producto.id}" class="cantidadProd oculto"><button id="menos-${producto.id}">-</button><input type="number" readonly id="cant-${producto.id}" value="1"><button id="mas-${producto.id}">+</button></div>`//en el input de la cantidad tendria que ir producto.carrito
            card.classList.add('card')
            seccionProd && seccionProd.append(card);
            eventoMasMenosCantidad(producto)
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

function totalCarrito(carrito){
   const total = carrito.reduce((acc, el) => acc + el.precioIva, 0)
    return total;
}

function eliminarCarrito(prod){
   const eliminarProd = carrito.findIndex((el) => el.id === prod.id)
   carrito.splice(eliminarProd, 1)
   prod.carrito = 0;
   let input = document.getElementById(`cant-${prod.id}`);
   input.value = prod.carrito
   localStorage.setItem("carrito", JSON.stringify(carrito))
   carritoStorage();
   mostrarCarrito(carrito) 
   console.log(carrito)
   console.log(prod)
}

function eventoEiminarCarrito(carrito){
    for (const producto of carrito) {
        document.getElementById(`eliminar-${producto.id}`).addEventListener('click', ()=> {
            eliminarCarrito(producto)
            btnCantidad(producto.id)
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

function mostrarCarrito(carrito){
    carritoSeccion && (carritoSeccion.innerHTML = '') ;
    imprimirCarrito(carrito)
    eventoEiminarCarrito(carrito)
    let totalC = totalCarrito(carrito)
    let total = document.createElement('div');
    total.innerHTML = `<h3 class="w-33">TOTAL</h3>
    <p class="w-33">${totalC}</p>`;
    carritoSeccion.append(total);
    total.classList.add('carritoItem')
}
//le paso la cantidad y agrego el producto al carrito 
function cantidadCarritoModif (producto, modificacion=true){
    let cantModificada = producto.carrito;
    modificacion ? cantModificada++ : cantModificada--;
    producto.carrito = parseInt(cantModificada);
}

function agregarACarrito(producto){
    console.log(producto)
    cantidadCarritoModif(producto)
    console.log(typeof(producto.carrito))
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
                duration: 3000
                }).showToast();
            producto.carrito = 0;    
            agregarACarrito(producto);
            btnCantidad(producto.id)
            let input = document.getElementById(`cant-${producto.id}`);
            input.value = producto.carrito
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

function btnCantidad(id){
    let btnCompra = document.getElementById(`prod-${id}`)
    let btnCantidad = document.getElementById(`cantidad-${id}`)
    if(btnCantidad.classList.contains('oculto')){
        btnCompra.classList.add('oculto')
        btnCantidad.classList.remove('oculto')
    }else{
        btnCompra.classList.remove('oculto')
        btnCantidad.classList.add('oculto')
    }
}

let botonCarrito = document.getElementById('car');
botonCarrito && (botonCarrito.onclick = () => {console.log('hola pag')});

let ver = document.getElementById('verCarrito');
if(ver){
ver.addEventListener('click',() => {
    console.log(carrito)
    console.log(carritoSeccion)
    mostrarCarrito(carrito)
})
}
// filtrar los productos que quiero ver
if(buscar){
buscar.addEventListener('input', (e) => {
    let prodABuscar = e.target.value;
    prodABuscar = prodABuscar.toUpperCase();
    const filtro = productos.filter((prod) => prod.nombre.includes(prodABuscar));
    seccionProd.innerHTML = "";
    imprimir(filtro);
})
}
cargar && cargar.addEventListener('click', cargarProd);
console.log(productos);
console.log(carrito);

imprimir(productos)
//cuando empieza la pagina chekeo si hay algo en el carrito para mostrar el boton comprar o el +/-
if(carrito.length != 0){
    for (const prod of carrito) {
        btnCantidad(prod.id)
        let input = document.getElementById(`cant-${prod.id}`);
        input.value = prod.carrito;
    }
}



//---------------------------------------------------------
/* const busqueda = productos.filter((el) => el.nombre.includes(`MOTO`));
console.log(`Busqueda de productos que contengan MOTO en el nombre ${JSON.stringify(busqueda)}`);

const valor = productos.filter((el) => el.precio <= 100000);
console.log(`Productos de menos de $100000 de costo ${JSON.stringify(valor)}`);

valor.forEach((el) => {console.log(el.nombre , el.precio)})

const faltantes = productos.filter((el) => el.stock == false);
console.log(`faltante ${JSON.stringify(faltantes)}`)

     Toastify({
        text: "This is a toast",
        duration: 3000
        }).showToast();

*/