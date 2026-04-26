// Panel derecho
const listaGastos = document.querySelector("#listaGastos");
const mensajeVacio = document.querySelector("#mensajeVacio");
const totalGastos = document.querySelector("#totalGastos");

// Panel izquierdo
const formGasto = document.querySelector("#formGasto");
const nombreGasto = document.querySelector("#nombreGasto");
const precioGasto = document.querySelector("#precioGasto");

const gastos = [];

// Renderizar gastos
const renderizarGastos = () => {
  listaGastos.innerHTML = "";

  if (gastos.length === 0) {
    listaGastos.appendChild(mensajeVacio);
    return;
  }

  gastos.forEach((gasto) => {
    const gastoElemento = document.createElement("div");

    gastoElemento.className =
      "flex items-center justify-between rounded-[16px] border border-[#14141314] bg-white px-5 py-4";

    gastoElemento.innerHTML = `
      <div>
        <h3 class="font-bold text-[#141413]">${gasto.nombre}</h3>
        <p class="text-sm text-[#555555]">Gasto registrado</p>
      </div>

      <p class="font-bold text-[#141413]">$${gasto.precio}</p>
    `;

    listaGastos.appendChild(gastoElemento);
  });
};

// Crear un gasto
formGasto.addEventListener("submit", (event) => {
  event.preventDefault();

  const gasto = {
    nombre: nombreGasto.value,
    precio: Number(precioGasto.value),
  };

  gastos.push(gasto);

  nombreGasto.value = "";
  precioGasto.value = "";

  renderizarGastos();

  console.log("gastos", gastos);
});