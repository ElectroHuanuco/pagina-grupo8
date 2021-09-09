const carrito = document.querySelector('#carrito');
const contenedorOrdenes = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const cajaElectrodomesticos = document.querySelector('#caja-electrodomesticos');
const iconoCarrito = document.querySelector('#iconoCarrito')
let articulosCarrito = [];
iconoCarrito.addEventListener('click', ()=>{
    if (carrito.classList.contains('hidden')) {
       carrito.classList.remove('hidden') 
       iconoCarrito.style.color = 'red';
    }else{
        carrito.classList.add('hidden') 
        iconoCarrito.style.color = '';
    }
})
cargarEvenListeners()
function cargarEvenListeners() {
    cajaElectrodomesticos.addEventListener('click',agregarArticulo);
    carrito.addEventListener('click',eliminarArticulo);
    vaciarCarritoBtn.addEventListener('click',e =>{
        e.preventDefault();
        articulosCarrito = [];
        limpiarHTMLCarrito()
    })
}
 function eliminarArticulo(e) {
     console.log('eliminando ....');
     console.log();

     if (e.target.classList.contains('eliminar-articulo')) {
         const pedidoId = e.target.getAttribute('data-id');
         articulosCarrito = articulosCarrito.filter(pedido => pedido.id !== pedidoId)
         carritoHTML();
     }
 }
function agregarArticulo(e) {
    if (e.target.classList.contains('agregar-carrito')) {
        const elecSeleccionado = e.target.parentElement
        
        leerDatosElectrodomestico(elecSeleccionado)
    }
}
function leerDatosElectrodomestico(electrodomestico) {
    console.log(electrodomestico);
    const infoCurso = {
        imagen: electrodomestico.querySelector('img').src,
        titulo: electrodomestico.querySelector('h3').textContent,
        precio: electrodomestico.querySelector('.precio').textContent,
        id : electrodomestico.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }
    console.log(infoCurso);
    const existe = articulosCarrito.some(pedido => pedido.id === infoCurso.id)
    if (existe) {
        const articulo = articulosCarrito.map(pedido => {
            if (pedido.id === infoCurso.id) {
                pedido.cantidad++;
                return pedido;
            }else{
                return pedido;
            }
        })
        articulosCarrito = [...articulo];
    }else{
        articulosCarrito = [...articulosCarrito , infoCurso];
    }
    carritoHTML();
    console.log(articulosCarrito);
}
function carritoHTML() {
   limpiarHTMLCarrito() 
    articulosCarrito.forEach( pedido => {
        const row = document.createElement('tr');
        row.classList.add('flex');
        row.classList.add('gap-x-4');
        row.classList.add('mt-2');
        row.innerHTML = `
        <td class="w-3/12">
        <img src="${pedido.imagen}" alt="" class="w-20">
        </td>
        <td class="w-3/12 py-2 justify-center">
        ${pedido.titulo}
        </td>
        <td class="w-2/12 py-2 justify-center">
        ${pedido.precio}
        </td>
        <td class="w-2/12 py-2 text-center">
        ${pedido.cantidad}
        </td>
        <td class="w-2/12 py-2 text-center">
        <i class="fas fa-times-circle text-2xl text-red-500 eliminar-articulo cursor-pointer" data-id="${pedido.id}"></i>
        </td>
        `
        contenedorOrdenes.appendChild(row)
    })
}
function limpiarHTMLCarrito() {
    while (contenedorOrdenes.firstChild) {
        contenedorOrdenes.removeChild(contenedorOrdenes.firstChild)
    }
}