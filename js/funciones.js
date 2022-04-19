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
//funciones del admin para cargar productos, no se muestran...
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

const limpiar = () => {
    codigo.value = "";
    descripcion.value = "";
    cantidad.value = "";
    precio.value = "";
}

cargar && cargar.addEventListener('click', cargarProd);

