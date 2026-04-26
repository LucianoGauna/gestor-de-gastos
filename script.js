// Panel derecho
const listaGastos = document.querySelector("#listaGastos");
const mensajeVacio = document.querySelector("#mensajeVacio");
const totalGastos = document.querySelector("#totalGastos");

// Panel izquierdo
const formGasto = document.querySelector("#formGasto");
const nombreGasto = document.querySelector("#nombreGasto");
const precioGasto = document.querySelector("#precioGasto");

let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

// Guardar gastos en localStorage
const guardarGastos = () => {
  localStorage.setItem("gastos", JSON.stringify(gastos));
};

// Calcular total de gastos
const calcularTotal = () => {
  let total = 0;

  gastos.forEach((gasto) => {
    total += gasto.precio;
  });

  totalGastos.textContent = `$${total}`;
};

// Eliminar un gasto
const eliminarGasto = (id) => {
  const indice = gastos.findIndex((gasto) => gasto.id === id);

  if (indice !== -1) {
    gastos.splice(indice, 1);
    guardarGastos();
  }

  renderizarGastos();
  calcularTotal();
};

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
      "flex items-center justify-between rounded-[16px] border border-[#14141314] bg-white px-5 py-4 shadow-md";

    gastoElemento.innerHTML = `
      <div>
        <h3 class="font-bold text-[#141413]">${gasto.nombre}</h3>
        <p class="text-sm text-[#555555]">Gasto registrado</p>
      </div>

      <div class="flex items-center gap-4">
        <p class="font-bold text-[#141413]">$${gasto.precio}</p>
        <button
          class="rounded-[20px] bg-[#CF4500] px-4 py-2 text-sm text-white cursor-pointer"
          onclick="eliminarGasto(${gasto.id})"
        >
          Eliminar
        </button>
      </div>
    `;

    listaGastos.appendChild(gastoElemento);
  });
};

// Crear un gasto
formGasto.addEventListener("submit", (event) => {
  event.preventDefault();

  if (nombreGasto.value.trim() === "" || Number(precioGasto.value) <= 0) {
    alert("Completá el nombre del gasto y un precio válido.");
    return;
  }

  const gasto = {
    id: Date.now(),
    nombre: nombreGasto.value,
    precio: Number(precioGasto.value),
  };

  gastos.push(gasto);

  nombreGasto.value = "";
  precioGasto.value = "";

  guardarGastos();
  renderizarGastos();
  calcularTotal();
});

// Renderizado inicial para actualizar la interfaz cuando se abre por primera vez
renderizarGastos();
calcularTotal();