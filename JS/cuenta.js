
   const nombreUsuario = document.getElementById('nombreUsuario');
const saldoSpan = document.getElementById('saldo');

let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

if (!usuarioActual) {
  window.location.href = "/index.html";
}

let usuario = usuarios.find(u => u.email === usuarioActual.email);
if (!usuario) {
  window.location.href = "/index.html";
}

nombreUsuario.textContent = usuario.nombre;
if (usuario.saldo === undefined) {
  usuario.saldo = 0;
}
actualizarSaldo();

function actualizarSaldo() {
  saldoSpan.textContent = usuario.saldo.toFixed(2);
}

function mostrarFormulario(tipo) {
  document.getElementById('formDeposito').classList.remove('active');
  document.getElementById('formRetiro').classList.remove('active');
  if (tipo === 'depositar') {
    document.getElementById('formDeposito').classList.add('active');
  } else {
    document.getElementById('formRetiro').classList.add('active');
  }
}

function depositar() {
  const cantidad = parseFloat(document.getElementById('cantidadDeposito').value);
  if (isNaN(cantidad) || cantidad <= 0) {
    mostrarPopupError("Cantidad inválida");
    return;
  }
  usuario.saldo += cantidad;
  guardarCambios();
  mostrarPopupExito("Depósito realizado con éxito");
}

function retirar() {
  const cantidad = parseFloat(document.getElementById('cantidadRetiro').value);
  if (isNaN(cantidad) || cantidad <= 0) {
    mostrarPopupError("Cantidad inválida");
    return;
  }
  if (cantidad > usuario.saldo) {
    mostrarPopupError("Saldo insuficiente");
    return;
  }
  usuario.saldo -= cantidad;
  guardarCambios();
  mostrarPopupExito("Retiro realizado con éxito");
}

function guardarCambios() {
  // Actualizar usuario en la lista
  const index = usuarios.findIndex(u => u.email === usuario.email);
  if (index !== -1) usuarios[index] = usuario;

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  localStorage.setItem('usuarioActual', JSON.stringify(usuario));
  actualizarSaldo();
  document.getElementById('formDeposito').classList.remove('active');
  document.getElementById('formRetiro').classList.remove('active');
}

function mostrarPopupError(mensaje) {
  const popup = document.getElementById('popupError');
  const mensajeTexto = document.getElementById('mensajePopupError');
  mensajeTexto.textContent = mensaje;
  popup.classList.remove('oculto');
}

document.getElementById('cerrarPopupError').addEventListener('click', () => {
  document.getElementById('popupError').classList.add('oculto');
});


function mostrarPopupExito(mensaje) {
  const popup = document.getElementById('popupExito');
  const mensajeTexto = document.getElementById('mensajePopupExito');
  mensajeTexto.textContent = mensaje;
  popup.classList.remove('oculto');
}

document.getElementById('cerrarPopup').addEventListener('click', () => {
  document.getElementById('popupExito').classList.add('oculto');
});

document.getElementById('cerrarSesion').addEventListener('click', () => {
  // Elimina solo al usuario actual
  localStorage.removeItem('usuarioActual');

  // Redirige al login
  window.location.href = "/index.html";
});
