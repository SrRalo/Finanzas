// Seleccionamos los elementos del navbar y las secciones
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');

// Agregamos un evento de click a cada elemento del navbar
navbar.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    // Ocultamos todas las secciones
    sections.forEach((section) => {
      section.classList.remove('active');
    });

    // Mostramos la sección correspondiente
    const targetSection = document.querySelector(`#${e.target.getAttribute('tap-target')}`);
    targetSection.classList.add('active');
  }
});


// Variables para almacenar datos
let saldoActual = 0;
let historialTransacciones = [];


// Funciones para registrar ingresos y gastos
function registrarIngreso(tipoIngreso, montoIngreso, fechaIngreso) {
  saldoActual += parseFloat(montoIngreso); // Convertir a número decimal
  historialTransacciones.push({
      tipo: "Ingreso",
      descripcion: `Ingreso por ${tipoIngreso}`,
      monto: parseFloat(montoIngreso), // Convertir a número decimal
      fecha: fechaIngreso
  });
  actualizarSaldo();
  mostrarHistorialTransacciones();
}

function registrarGasto(tipoGasto, montoGasto, fechaGasto) {
  saldoActual -= parseFloat(montoGasto); // Convertir a número decimal
  historialTransacciones.push({
      tipo: "Gasto",
      descripcion: `Gasto en ${tipoGasto}`,
      monto: parseFloat(montoGasto), // Convertir a número decimal
      fecha: fechaGasto
  });
  actualizarSaldo();
  mostrarHistorialTransacciones();
}

// Función para actualizar el saldo
function actualizarSaldo() {
    document.getElementById("saldo-actual").textContent = saldoActual.toFixed(2); // Mostrar con dos decimales
}

// Función para mostrar el historial de transacciones
function mostrarHistorialTransacciones() {
    const tablaHistorial = document.getElementById("historial-tabla").querySelector("tbody");
    tablaHistorial.innerHTML = ""; // Limpiar el contenido actual

    historialTransacciones.forEach(transaccion => {
        const fila = tablaHistorial.insertRow();
        const celdaFecha = fila.insertCell();
        const celdaDescripcion = fila.insertCell();
        const celdaTipo = fila.insertCell();
        const celdaMonto = fila.insertCell();

        celdaFecha.textContent = transaccion.fecha;
        celdaDescripcion.textContent = transaccion.descripcion;
        celdaTipo.textContent = transaccion.tipo;
        celdaMonto.textContent = transaccion.monto.toFixed(2); // Mostrar con dos decimales
    });
}


// Eventos para los formularios
const formularioOperacion = document.getElementById("operacion-form");
formularioOperacion.addEventListener("submit", function(event) {
  event.preventDefault(); // Evitar la recarga de la página

  const operacion = document.getElementById("operacion").value;
  const tipoOperacion = document.getElementById("tipo-operacion").value;
  const montoOperacion = parseFloat(document.getElementById("monto-operacion").value);
  const fechaOperacion = document.getElementById("fecha-operacion").value;

  if (operacion === "ingreso") {
    registrarIngreso(tipoOperacion, montoOperacion, fechaOperacion);
  } else if (operacion === "gasto") {
    registrarGasto(tipoOperacion, montoOperacion, fechaOperacion);
  }
});

// Array para almacenar los recordatorios
let recordatorios = [];

// Función para agregar un nuevo recordatorio
function agregarRecordatorio() {
  const titulo = document.getElementById("titulo-recordatorio").value;
  const descripcion = document.getElementById("descripcion-recordatorio").value;
  const fecha = document.getElementById("fecha-recordatorio").value;

  // Crear un objeto para el nuevo recordatorio
  const recordatorio = {
    titulo: titulo,
    descripcion: descripcion,
    fecha: fecha
  };

  // Agregar el recordatorio al array
  recordatorios.push(recordatorio);

  // Mostrar el recordatorio en la lista
  mostrarRecordatorios();

  // Limpiar los campos del formulario
  document.getElementById("titulo-recordatorio").value = "";
  document.getElementById("descripcion-recordatorio").value = "";
  document.getElementById("fecha-recordatorio").value = "";
}

// Función para mostrar los recordatorios en la lista
function mostrarRecordatorios() {
  const container = document.getElementById("recordatorios-container");
  container.innerHTML = "";

  recordatorios.forEach((recordatorio, index) => {
    const postIt = document.createElement("div");
    postIt.className = "post-it";
    postIt.innerHTML = `
      <h3>${recordatorio.titulo}</h3>
      <p>${recordatorio.descripcion}</p>
      <p>Fecha: ${recordatorio.fecha}</p>
      <button class="eliminar" data-index="${index}">Eliminar</button>
    `;
    container.appendChild(postIt);
  });
}

// Event listener para el botón "Agregar Recordatorio"
document.getElementById("agregar-recordatorio").addEventListener("click", agregarRecordatorio);

// Event listener para los post-it
document.getElementById("recordatorios-container").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.className === "eliminar") {
    const index = e.target.dataset.index;
    eliminarRecordatorio(index);
  }
});

// Función para eliminar un recordatorio
function eliminarRecordatorio(index) {
  recordatorios.splice(index, 1);
  mostrarRecordatorios();
}


//grafica circular

// Obtener el elemento canvas
const ctx = document.getElementById('grafica-ingresos-egresos').getContext('2d');

// Datos de ejemplo para la gráfica
const ingresos = 500;
const egresos = 300;

// Configuración de la gráfica
const config = {
  type: 'doughnut',
  data: {
    labels: ['Ingresos', 'Egresos'],
    datasets: [{
      label: 'Ingresos y Egresos',
      data: [ingresos, egresos],
      backgroundColor: [
        'rgba(54, 162, 235, 0.5)', // Azul para ingresos
        'rgba(255, 99, 132, 0.5)' // Rojo para egresos
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    }
  }
};

// Renderizar la gráfica
const chart = new chart(ctx, config);
