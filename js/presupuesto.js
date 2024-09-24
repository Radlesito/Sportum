// Función para calcular el presupuesto final
function calcularPresupuesto() {
  var precioBase = parseFloat(document.getElementById('producto').value);
  var plazo = parseInt(document.getElementById('plazo').value);
  var extraSeleccionado = parseFloat(document.querySelector('select[name="extras"]').value);
  
  

  var descuento = 0;
  if (plazo >= 2) {
      descuento = precioBase * 0.1; // descuento del 10% en precio base
  }

  var presupuestoFinal = precioBase + extraSeleccionado - descuento;
  
  // Asegurarse de que no se muestre "NaN"
  if (isNaN(presupuestoFinal)) {
      presupuestoFinal = 0;
  }

  // Mostrar el presupuesto calculado
  document.getElementById('presupuestoFinal').textContent = presupuestoFinal.toFixed(2) + '€';
}

// Función para validar el formulario
function validarFormulario(event) {
  var nombre = document.getElementById('nombre').value.trim();
  var apellidos = document.getElementById('apellidos').value.trim();
  var telefono = document.getElementById('telefono').value.trim();
  var email = document.getElementById('email').value.trim();
  var condiciones = document.getElementById('condiciones').checked;
  var presupuestoFinal = parseFloat(document.getElementById('presupuestoFinal').textContent);

  var letrasSolo = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  var numerosSolo = /^[0-9]+$/;
  var emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var errores = [];

  // Validar nombre (solo letras y máximo 15 caracteres)
  if (!nombre.match(letrasSolo) || nombre.length > 15) {
    errores.push("Por favor, introduzca un nombre válido (máximo 15 letras).\n");
  }

  // Validar apellidos (solo letras y máximo 40 caracteres)
  if (!apellidos.match(letrasSolo) || apellidos.length > 40) {
    errores.push("Por favor, introduzca apellidos válidos (máximo 40 letras).\n");
  }

  // Validar teléfono (exactamente 9 dígitos numéricos)
  if (!telefono.match(numerosSolo) || telefono.length !== 9) {
    errores.push("Por favor, introduzca un teléfono válido (exactamente 9 dígitos).\n");
  }

  // Validar correo electrónico
  if (!email.match(emailValido)) {
    errores.push("Por favor, introduzca un correo electrónico válido.\n");
  }

  // Validar si el presupuesto final no es 0
  if (presupuestoFinal === 0) {
    errores.push("El presupuesto no puede ser 0. Por favor, seleccione los productos y extras.\n");
  }

  // Validar si las condiciones de privacidad han sido aceptadas
  if (!condiciones) {
    errores.push("Debe aceptar las condiciones de privacidad.\n");
  }

  // Mostrar errores si los hay
  if (errores.length > 0) {
    alert(errores.join("")); // Mostrar los errores en una alerta
    event.preventDefault(); // Prevenir que el formulario se envíe o se resetee
    return false;
  }

  return true;
}



// Función para enviar el presupuesto (simulación)
function enviarPresupuesto(event) {
  if (!validarFormulario(event)) return; // validar formulario antes de enviar
  alert('Presupuesto enviado correctamente.'); // simular el envío real
}

// Asignar eventos 'change' a los campos que deben recalcular el presupuesto automáticamente
document.getElementById('producto').addEventListener('change', calcularPresupuesto);
document.getElementById('plazo').addEventListener('change', calcularPresupuesto);

var extras = document.getElementsByName('extras');
for (var i = 0; i < extras.length; i++) {
  extras[i].addEventListener('change', calcularPresupuesto);
}

// Asignar el evento 'submit' al formulario para evitar su envío si hay errores
document.getElementById('formularioPresupuesto').addEventListener('submit', enviarPresupuesto);
