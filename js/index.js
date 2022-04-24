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
    <button id="prod-${producto.id}" class="btn btnCompra btn-rounded">Comprar</button>
    <div id="cantidad-${producto.id}" class="cantidadProd oculto">
    <button type="button" id="menos-${producto.id}" class="btn btnCantidad">-</button>
    <input type="number" readonly id="cant-${producto.id}" value="1">
    <button type="button" id="mas-${producto.id}" class="btn btnCantidad">+</button></div>`//en el input de la cantidad tendria que ir producto.carrito
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
let productosALaVista = []

function imprimir(arrProductos, filtroBusqueda = true) {
    controlProductos(carrito, arrProductos)
    if(filtroBusqueda){
        productosALaVista = [];
        productosALaVista.push(...arrProductos)
    }
    console.log(arrProductos)
    console.log(productosALaVista)
    seccionProd.innerHTML = "";
    (arrProductos.length == productos.length) && (tituloSeccionDeProducos.innerHTML = "Productos");
    for (const producto of arrProductos) {       
        crearCard(producto)
        eventoMasMenosCantidad(producto)
        if(producto.carrito != 0){
            console.log('prueba')
            let input = document.getElementById(`cant-${producto.id}`);
            input.value = producto.carrito;
            btnCantidad(producto.id, false)
        }
    }
    eventoComprar(arrProductos)
}
// filtrar los productos que quiero ver
if(buscar){
    buscar.addEventListener('input', (e) => {
        //ver como limpiar el filtro si input.length = 0 filtro= []vacio
        let prodABuscar = e.target.value;
        prodABuscar = prodABuscar.toUpperCase();
        let filtro = productosALaVista.filter((prod) => prod.nombre.includes(prodABuscar));
        seccionProd.innerHTML = "";
        console.log(filtro)
        console.log(productos)
        console.log(prodABuscar.length)
        /* prodABuscar.length == 0 ? imprimir(productos) : */ imprimir(filtro, false);
        
    })
    buscar.addEventListener('blur', ()=> {
        buscar.value = "";
    })
    }



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
   let total = carrito.reduce((acc, el) => acc + (el.precioIva * el.carrito), 0)
   total = total.toFixed(2)
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
    console.log(prod)
   const eliminarProd = carrito.findIndex((el) => el.id === prod.id)
   carrito.splice(eliminarProd, 1)
   prod.carrito = 0;
   paginaCompleta.classList.contains('oculto') && imprimir(productos)
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
   Toastify({
    text: "tu producto se elimió del carrito",
    duration: 1500,
    gravity: 'bottom',
    style: {
        background: "red",
      }
    }).showToast();
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
                                <i id="eliminar-${prod.id}" class="far fa-trash-alt "></i>`;
        carritoSeccion.append(prodCarrito);
        prodCarrito.classList.add('carritoItem')
    }
}

async function totalCarrito(carrito){
    let totalC = calcularTotal(carrito)
    let total = document.createElement('div');
    total.innerHTML = `<h3 class="w-33">TOTAL</h3> <p>$</p>
    <p id="totalPesos" class="w-33"> ${totalC}</p>`;
    total.classList.add('totalItem')  
    
    let totalUDS = await totalEnDolares(totalC)
    let totalDolar = document.createElement('div');
    totalDolar.innerHTML = `<h3 class="w-33">TOTAL UDS</h3><p>US$</p>
    <p id="totalDolar" class="w-33"> ${totalUDS}</p>`
    totalDolar.classList.add('totalItem') 
    console.log(totalUDS)
    
    carritoSeccion.append(total);
    total.classList.add('carritoItem')
    carritoSeccion.append(totalDolar);
    totalDolar.classList.add('carritoItem')
}
async function mostrarCarrito(carrito){
    carritoSeccion && (carritoSeccion.innerHTML = '') ;
    continuarCompra.classList.remove('oculto')
    if(carrito.length == 0){
        carritoSeccion.innerHTML = `<h3>Tu carrito esta vacio</h3>`
        continuarCompra.classList.add('oculto')
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
                text: "tu producto se agregó al carrito",
                duration: 1500,
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
    console.log('evento mas menos')
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


console.log(productos);
console.log(carrito);

imprimir(productos)
//mostrar el numero de productos que hay en el carrito en el icono
const notificacionCarrito = () => {
    nroCarrito.innerHTML = carrito.length;
}
notificacionCarrito()

function mostrarOcultarCarrito(accion) {
    metodoDePago.classList.add('oculto')
    if(accion == true){
        paginaCompleta.classList.add('oculto')
        carritoCompleto.classList.remove('oculto')
    }else{
        paginaCompleta.classList.remove('oculto')
        carritoCompleto.classList.add('oculto')
    }
}

inicio.addEventListener('click', () => {mostrarOcultarCarrito(false)
    imprimir(productos)
}) 

//btn continuar para elegir como pagar
let totalEnPesos = 0;
let totalEnDolar = 0;
continuarCompra.addEventListener('click', ()=>{ 
    console.log('este es el boton de continuar')
    let totalPesos = document.getElementById('totalPesos').innerHTML
    totalEnPesos = parseFloat(totalPesos).toFixed(2)
    let totalDolar = document.getElementById('totalDolar').innerHTML
    totalEnDolar = parseFloat(totalDolar).toFixed(2)
    console.log(totalEnDolar)
    console.log(totalEnPesos)
    carritoCompleto.classList.add('oculto')
    metodoDePago.classList.remove('oculto')
})
//el final de la compra con un modal
function mostrarMetodosPago(metodo){
    let totalCompra
    if (metodo == "Debe seleccionar un metodo de pago") {
        cuerpoModal.innerHTML = "";
        let contenedorMetodosError = document.createElement('div');
        contenedorMetodosError.innerHTML = `<h3>${metodo}</h3>`
        cuerpoModal.append(contenedorMetodosError)
        cuerpoModal.classList.add('cuerpoModal')
    }else{
        cuerpoModal.innerHTML = "";
        metodo == "Pesos" ? totalCompra = totalEnPesos : totalCompra = totalEnDolar;
        console.log(totalCompra)
        let contenedorMetodos = document.createElement('div');
        contenedorMetodos.innerHTML = `<h3>Su compra fue realizada con exito</h3>
                                        <p>Uds abono ${totalCompra} ${metodo}</p>`
        cuerpoModal.append(contenedorMetodos)
        cuerpoModal.classList.add('cuerpoModal')
    }
}

//Mostrar las diferentes categorias de productos
function mostrarCategoria(cat){
    console.log(cat)
    let categoriaAMostrar = productos.filter((el) => el.categoria == cat)
    console.log(categoriaAMostrar)
    imprimir(categoriaAMostrar)

}
//func para volver directo del carrito a una de las categorias de prod
function mostrarCategorias(){
    paginaCompleta.classList.contains('oculto') && mostrarOcultarCarrito(false);
}
celulares.addEventListener('click', () => {
    mostrarCategorias();
    let cat = 'CELULAR'
    mostrarCategoria(cat)
    tituloSeccionDeProducos.innerHTML = "Celulares";
})

notebook.addEventListener('click', () => {
    mostrarCategorias();
    let cat = 'NOTEBOOK'
    mostrarCategoria(cat)
    tituloSeccionDeProducos.innerHTML = "Notebooks";
})
smartwatch.addEventListener('click', () => {
    mostrarCategorias();
    let cat = 'SMARTWATCH'
    mostrarCategoria(cat)
    tituloSeccionDeProducos.innerHTML = "Smartwatch";
})


//mostramos el modal con los datos de la compra depende lo que hayamos elegido
let finalCompra = document.getElementById('finalCompra')
finalCompra.addEventListener('click', ()=> {
    let opcion = document.querySelector('input[name=formaPago]:checked');
    let metodo;
    opcion ? metodo = opcion.value : metodo = "Debe seleccionar un metodo de pago"
    console.log(metodo)
    mostrarMetodosPago(metodo)
    if(opcion){
        let formulario = document.getElementById('formulario')
        formulario.reset();
        carrito = []
        localStorage.setItem("carrito", JSON.stringify(carrito))
        carritoStorage();
        notificacionCarrito();
        console.log(carrito)
        mostrarOcultarCarrito(false)
        imprimir(productos)
    }    
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