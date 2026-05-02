// Panel izquierdo
const listaGastos = document.querySelector("#listaGastos");
const mensajeVacio = document.querySelector("#mensajeVacio");
const totalGastos = document.querySelector("#totalGastos");
const cantidadGastos = document.querySelector("#cantidadGastos");

// Panel derecho
const formGasto = document.querySelector("#formGasto");
const nombreGasto = document.querySelector("#nombreGasto");
const precioGasto = document.querySelector("#precioGasto");
const categoriaGasto = document.querySelector("#categoriaGasto");
const btnBorrar = document.querySelector("#btnBorrar");

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

  totalGastos.textContent = `$${total.toLocaleString("es-AR")}`;
};

// Actualizar cantidad de gastos
const actualizarCantidad = () => {
  cantidadGastos.textContent = gastos.length;
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
  actualizarCantidad();
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

    const informacionGasto = document.createElement("div");

    informacionGasto.innerHTML = `
      <h3 class="font-bold text-[#141413]">${gasto.nombre}</h3>
      <p class="text-sm text-[#555555]">${gasto.categoria}</p>
    `;

    const accionesGasto = document.createElement("div");

    accionesGasto.className = "flex items-center gap-4";

    const precioGastoElemento = document.createElement("p");

    precioGastoElemento.className = "font-bold text-[#141413]";
    precioGastoElemento.textContent = `$${gasto.precio.toLocaleString("es-AR")}`;

    const botonEliminar = document.createElement("button");

    botonEliminar.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    botonEliminar.className =
      "flex h-8 w-8 items-center justify-center rounded-full bg-[#CF4500] text-sm text-white cursor-pointer";
    botonEliminar.title = "Eliminar gasto";

    botonEliminar.addEventListener("click", () => {
      eliminarGasto(gasto.id);
    });

    accionesGasto.appendChild(precioGastoElemento);
    accionesGasto.appendChild(botonEliminar);

    gastoElemento.appendChild(informacionGasto);
    gastoElemento.appendChild(accionesGasto);

    listaGastos.appendChild(gastoElemento);
  });
};

// Crear un gasto
formGasto.addEventListener("submit", (event) => {
  event.preventDefault();

  const nombreIngresado = nombreGasto.value.trim();
  const precioIngresado = Number(precioGasto.value);
  const categoriaIngresada = categoriaGasto.value;

  if (nombreIngresado === "") {
    alert("Completá el nombre del gasto.");
    nombreGasto.focus();
    return;
  }

  if (precioIngresado <= 0) {
    alert("Ingresá un precio válido.");
    precioGasto.focus();
    return;
  }

  const gastoDuplicado = gastos.some((gasto) => {
    return (
      gasto.nombre.toLowerCase() === nombreIngresado.toLowerCase() &&
      gasto.precio === precioIngresado &&
      gasto.categoria === categoriaIngresada
    );
  });

  if (gastoDuplicado) {
    alert("Ese gasto ya fue registrado.");
    nombreGasto.focus();
    return;
  }

  const gasto = {
    id: Date.now(),
    nombre: nombreIngresado,
    precio: precioIngresado,
    categoria: categoriaIngresada,
  };

  gastos.push(gasto);

  nombreGasto.value = "";
  precioGasto.value = "";

  guardarGastos();
  renderizarGastos();
  calcularTotal();
  actualizarCantidad();

  nombreGasto.focus();
});

// Borrar datos de formulario
btnBorrar.addEventListener("click", () => {
  nombreGasto.value = "";
  precioGasto.value = "";
  categoriaGasto.value = "Comida";
  nombreGasto.focus();
});

// Renderizado inicial para actualizar la interfaz cuando se abre por primera vez
renderizarGastos();
calcularTotal();
actualizarCantidad();
