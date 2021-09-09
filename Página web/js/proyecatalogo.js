const cajaCards = document.querySelector("#caja-electrodomesticos");
const selectFabricante = document.querySelector("#fabricante");

const inputRangoMax = document.querySelector("#inputRangoMax");
const textRangoMax = document.querySelector("#max");

const inputRangoMin = document.querySelector("#inputRangoMin");
const textRangoMin = document.querySelector("#min");

const btnColor = document.querySelector("#color");

const btnCategoria = document.querySelector("#categorias");

const btnRestablecerFiltro = document.querySelector('#restablecerFiltro')

const textoTituloElectrodomesticos = document.querySelector(
  "#textoTituloCategoria"
);
const datosBusqueda = {
  fabricante: "",
  precioMaximo: "",
  precioMinimo: "",
  color: "",
  categoria: "",
};

btnRestablecerFiltro.addEventListener('click', () => {
   datosBusqueda.fabricante = '';
   datosBusqueda.precioMaximo = 5000;
   datosBusqueda.precioMinimo = 0;
   datosBusqueda.color = '';
   datosBusqueda.categoria = '';
   
   for (let index = 0; index < 4; index++) {
    btnColor.children[index].children[1].style.color = "black";
   }

   inputRangoMax.value = 5000;
   textRangoMax.textContent = '5000';
   
   inputRangoMin.value = 0;
   textRangoMin.textContent = 0;

   selectFabricante.options.selectedIndex = 0;

   textoTituloElectrodomesticos.textContent = 'Todas las categorias'

   console.log(selectFabricante.options.selectedIndex);
   filtrarElectrodomestico();
})

selectFabricante.addEventListener("change", (e) => {
  datosBusqueda.fabricante = e.target.value;
  console.log(e.target.value);
  filtrarElectrodomestico();
});

inputRangoMax.addEventListener("change", (e) => {
  datosBusqueda.precioMaximo = e.target.value;
  filtrarElectrodomestico();
  console.log(e.target.value);
});

inputRangoMin.addEventListener("change", (e) => {
  datosBusqueda.precioMinimo = e.target.value;
  console.log(e.target.value);
  filtrarElectrodomestico();
});

btnColor.addEventListener("click", (e) => {
  
  if (e.target.classList.contains('btn-color')) {
     for (let index = 0; index < 4; index++) {
    btnColor.children[index].children[1].style.color = "black";
  }
  datosBusqueda.color = e.target.value;
  e.target.style.color = "red";
  filtrarElectrodomestico();
  }
 
});



btnCategoria.addEventListener("click", (e) => {
  
  if (e.target.classList.contains('btn-categoria')) {
    datosBusqueda.categoria = e.target.value;
  textoTituloElectrodomesticos.textContent = e.target.textContent;
  if (!e.target.value) {
    datosBusqueda.categoria = "";
    textoTituloElectrodomesticos.textContent = " Todas las categorias";
  }
  console.log(e.target.value);
  filtrarElectrodomestico();
  }
  
});

function restringirMin() {
  let max = parseInt(inputRangoMax.value);
  let min = parseInt(inputRangoMin.value);
  let resto = max - min;

  if (resto <= 0) {
    inputRangoMin.value = max - 0;
    textRangoMin.textContent = inputRangoMin.value;
  }
}

function restringirMax() {
  let max = parseInt(inputRangoMax.value);
  let min = parseInt(inputRangoMin.value);
  let resto = max - min;
  if (resto <= 0) {
    inputRangoMax.value = min + 0;
    textRangoMax.textContent = inputRangoMax.value;
    console.log("xxx");
  }
}

inputRangoMin.oninput = () => {
  restringirMin();
  textRangoMin.textContent = inputRangoMin.value;
};

inputRangoMax.oninput = () => {
  restringirMax();
  textRangoMax.textContent = inputRangoMax.value;
};
document.addEventListener("DOMContentLoaded", () => {
  mostrarElectrodomesticos(electrodomesticos);
  llenarSelectFabricante();
});

function mostrarElectrodomesticos(electrodomesticos) {
  limpiarHtml();

  electrodomesticos.forEach((electrodomestico) => {
    const electroD = document.createElement("P");

    electroD.innerHTML = `
        <div class="">
        <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
          <img src="${electrodomestico.imagen}" alt="Front of men&#039;s Basic Tee in black." class="w-full h-full object-center object-cover lg:w-full lg:h-full">
        </div>
        <div class="mt-4 flex justify-between my-4">
          <div>
            <h3 class="text-xs text-gray-700">
            ${electrodomestico.categoria} ${electrodomestico.fabricante} ${electrodomestico.modelo} 
             
            </h3>
            <p class="mt-1 text-sm text-gray-500">${electrodomestico.color}</p>
          </div>
          <p class="precio text-sm font-medium text-gray-900">$${electrodomestico.precio}</p>
        </div>

        <button class="agregar-carrito w-full p-2 bg-gray-600 rounded-xl text-white 
        transition duration-500 ease-in-out  hover:bg-red-600 transform hover:-translate-y-1 hover:scale-105 
        
        " data-id ="${electrodomestico.id}">Agregar al carrito</button>
      </div>
        `;
    cajaCards.appendChild(electroD);
  });
}
function limpiarHtml() {
  while (cajaCards.firstChild) {
    cajaCards.removeChild(cajaCards.firstChild);
  }
}
function llenarSelectFabricante() {
  const listaFabricantes = ["OSTER", "LG", "Recco", "Delonghi",'AOC','Bosch','Hisense','PHILIPS'];
  for (let index = 0; index < listaFabricantes.length; index++) {
    const opcion = document.createElement("option");
    opcion.value = listaFabricantes[index];
    opcion.textContent = listaFabricantes[index];
    selectFabricante.appendChild(opcion);
  }
}
function filtrarElectrodomestico() {
  const resultado = electrodomesticos
    .filter(filtrarFabricante)
    .filter(filtrarColor)
    .filter(filtrarCategoria)
    .filter(filtrarMaximo)
    .filter(filtrarMinimo);

  if (resultado.length) {
    limpiarAlertaNR();
    mostrarElectrodomesticos(resultado);
  } else {
    limpiarAlertaNR();
    noResultado();
  }
}

const alertaNoResultados = document.querySelector("#alertaNoResultado");

function noResultado() {
  limpiarHtml();
  const alertNoResultado = document.createElement("DIV");
  alertNoResultado.innerHTML = `
    <h1 class="full bg-red-500 text-yellow-200 p-2 text-center"> No hay resultados <i class="fas fa-exclamation-triangle"></i></h1>
    `;

  alertaNoResultados.appendChild(alertNoResultado);
}

function limpiarAlertaNR() {
  if (alertaNoResultados.children[0]) {
    console.log(alertaNoResultados);
    alertaNoResultados.removeChild(alertaNoResultados.children[0]);
  }
}

function filtrarFabricante(electrodomestico) {
  if (datosBusqueda.fabricante) {
    return electrodomestico.fabricante === datosBusqueda.fabricante;
  }
  return electrodomestico;
}

function filtrarColor(electrodomestico) {
  if (datosBusqueda.color) {
    return electrodomestico.color === datosBusqueda.color;
  }
  return electrodomestico;
}

function filtrarCategoria(electrodomestico) {
  if (datosBusqueda.categoria) {
    return electrodomestico.categoria === datosBusqueda.categoria;
  }
  return electrodomestico;
}

function filtrarMaximo(electrodomestico) {
  if (datosBusqueda.precioMaximo) {
    return electrodomestico.precio <= datosBusqueda.precioMaximo;
  }
  return electrodomestico;
}

function filtrarMinimo(electrodomestico) {
  if (datosBusqueda.precioMinimo) {
    return electrodomestico.precio >= datosBusqueda.precioMinimo;
  }
  return electrodomestico;
}