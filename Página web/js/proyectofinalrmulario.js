//Variables
const inputNombre = document.querySelector('#nombre')
const btnComprar = document.querySelector('#btn-comprar')
const cajaModal =document.querySelector('#cajaModal')
const formulario = document.querySelector('#cajaModal form')
const textoTituloModal = document.querySelector('#titulo-modal')
const opModal = document.querySelector('#btnOpcionesModal')

console.log(articulosCarrito);
// console.log(inputNombre);
// console.log(btnComprar);
// console.log(cajaModal);

const infoCliente = {
    nombre: ''
}

btnComprar.addEventListener('click',()=>{

     //llenamos los campos de infoCliente

     infoCliente.nombre = inputNombre.value;

    if (inputNombre.value) {

       formulario.classList.add('hidden')
       
       textoTituloModal.textContent = 'Compra realizada con éxito, se llevara su pedido a su casa'
       opModal.classList.add('hidden')

       const divInfoCliente =  document.createElement('div');
      

       divInfoCliente.innerHTML = `
       
       <h1> ${infoCliente.nombre}</h1>
       `

       cajaModal.appendChild(divInfoCliente);
      
      articulosCarrito.forEach( (articulos) => {
    
     const divInfoArticulos = document.createElement('div');

      divInfoArticulos.innerHTML = `
      <p>${articulos.titulo}--${articulos.precio}--${articulos.cantidad}</p>
      `
      cajaModal.appendChild(divInfoArticulos);

      })
      


    }else{
        alert('rellene todos los campos')
    }
})


// Para la ventana modal 
document.addEventListener('DOMContentLoaded', () =>{
    const ventanaModal = document.querySelector('#ventana-modal')
    const btnPedir = document.querySelector('#btn-pedir')
    const closeBtn = document.querySelector('#close-modal')
    const btnCancelar = document.querySelector('#btn-cancelar')
    

    const toggleModal = () => {
        ventanaModal.classList.toggle('hidden')
        ventanaModal.classList.toggle('flex')
    }

    btnPedir.addEventListener('click', toggleModal)

    closeBtn.addEventListener('click', toggleModal)

    btnCancelar.addEventListener('click', toggleModal)
})