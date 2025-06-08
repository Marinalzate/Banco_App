
  // creamos las varia bles  obteniendo la informacion desde si id 
  
  const nombreUsuario = document.getElementById('nombreUsuario');
const saldo = document.getElementById('saldo');


// Buscar quién está usando el sistema actualmente (usuarioActual)
// Cargar todos los usuarios para futuras operaciones 

let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');


// valida que exista un usuario actual  Si no hay usuario actual, 
// redirige a la página de inicio de sesión
if (!usuarioActual) {
  window.location.href = "/incioSesion.html";
}


//Busca en la lista de usuarios al usuario que coincide con el actual. Si no lo encuentra, redirige también.
let usuario = usuarios.find(buscarUsuario => buscarUsuario.email === usuarioActual.email);
if (!usuario) {
  window.location.href = "/incioSesion.html";
}

//Muestra el nombre del usuario en la página.
nombreUsuario.textContent = usuario.nombre;


//Aqui validamos que  el usuario no tenga ningun saldo determinado anteriorment y si es a si le asignamos el monto inicial de 200.000
if (usuario.saldo === undefined) {
  usuario.saldo = 200000;
}

//Si no tiene historial de movimientos, se inicializa como un array vacío. osea no hay nada que mostrar en  el  historial
if (!usuario.movimientos) {
  usuario.movimientos = [];
}

//Actualiza el saldo en pantalla y muestra el historial de movimientos.
actualizarSaldo();
mostrarHistorial();


//ps actualiza el saldo hahah
//texContent  actualiza el saldo que tenemos en htmly qe se muestra al usuarion
//toFixed(2): Método que convierte el número a una cadena de texto, redondeándolo a exactamente 2 decimales.
function actualizarSaldo() {
  saldo.textContent = usuario.saldo.toFixed(2);
}

// esta funcion va de la mano con el css ya  que en css usamos  la clase active para mostrar la informacion del  form para realizar la accion removiendo la calse "active  del elemento en html" luego dependinedo de la accion  se activa  el formulario solo para esa accion en espesifico

function mostrarFormulario(tipo) {

  //aqui desactivamos la clase   apra que no se muestre 
  document.getElementById('formDeposito').classList.remove('active');
  document.getElementById('formRetiro').classList.remove('active');
  document.getElementById('formTransferencia').classList.remove('active');

  //Segun la clase el tipo de accion se asigna nuevamnete la clase acctive atraves de classList.add
  if (tipo === 'depositar') {
    document.getElementById('formDeposito').classList.add('active');
  } else if (tipo === 'retirar') {
    document.getElementById('formRetiro').classList.add('active');
  } else if (tipo === 'transferir') {
    document.getElementById('formTransferencia').classList.add('active');
  }
}

//Obtiene la cantidad ingresada para depósito y la convierte en número.,
function depositar() {
  const cantidad = Number(document.getElementById('cantidadDeposito').value);

  //Si no es un número válido o menor o igual a cero, muestra error.
  if (isNaN(cantidad) || cantidad <= 0) {
    mostrarPopupError("Cantidad inválida");
    return;
  }

  //Suma el monto al saldo, registra el movimiento, y muestra un popup de éxito.
  usuario.saldo += cantidad;
  registrarMovimiento('Depósito', cantidad);
  mostrarPopupExito("Depósito realizado con éxito");

}


//Obtiene la cantidad ingresada para retiro y la convierte en número.
function retirar() {
  const cantidad = Number(document.getElementById('cantidadRetiro').value);

    //Si no es un número válido o menor o igual a cero, muestra error.
  if (isNaN(cantidad) || cantidad <= 0) {
    mostrarPopupError("Cantidad inválida");
    return;
  }

    //Si la cantidad es mayor al saldo del usuario muestra error.
  if (cantidad > usuario.saldo) {
    mostrarPopupError("Saldo insuficiente");
    return;
  }

    //Resta el monto al saldo, registra el movimiento, y muestra un popup de éxito.
  usuario.saldo -= cantidad;
  registrarMovimiento('Retiro', cantidad);
  mostrarPopupExito("Retiro realizado con éxito");
}

//Solicita la informacion del email para la transferencia y elimina los espacion  tambien solcita la cantidad a transferir  y la pasa a  numeros
function transferir() {
  const emailDestinatario = document.getElementById('emailDestinatario').value.trim();
  const cantidad = Number(document.getElementById('cantidadTransferencia').value);

//Verifica que el email ( un email que si exista)  y el monto sean válidos 
  if (!emailDestinatario || isNaN(cantidad) || cantidad <= 0) {
    mostrarPopupError("Ingrese un email válido y una cantidad positiva.");
    return;
  }

  //que sea  difenrente a  el email del usuario actual 
  if (emailDestinatario === usuario.email) {
    mostrarPopupError("No puedes transferirte a ti mismo.");
    return;
  }

  //usca al destinatario en el array de usuarios que creamos en la pagina de registros
  const destinatario = usuarios.find(usuarioSearch => usuarioSearch.email === emailDestinatario);
  if (!destinatario) {
    mostrarPopupError("El destinatario no existe.");
    return;
  }

  //Revisa si el usuario tiene suficiente saldo.
  if (cantidad > usuario.saldo) {
    mostrarPopupError("Saldo insuficiente para realizar la transferencia.");
    return;
  }

// Aqui validamos  que  si es el primer movimiento del usuarion en su cuenta osea un usuario completamente nuevo inicializamos el saldo mas la transferencia 
  if (destinatario.saldo === undefined) {
    destinatario.saldo = 200000};

  if (!destinatario.movimientos) {
    destinatario.movimientos = []};

    //Realiza el movimiento de saldo entre cuentas.
  usuario.saldo -= cantidad;
  destinatario.saldo += cantidad;

  //genera la fecha y hora  del movimiento
  //La función Date() proviene de la API nativa de JavaScript. No necesitas importar nada extra ni usar bibliotecas externas: es parte del núcleo del lenguaje JavaScript.
  //toLocaleString();  vuelve la fecha string legisble
  const ahora = new Date().toLocaleString();

  //Envia la informacion (objeto) al array movimiento
  usuario.movimientos.push({
    fecha: ahora,
    tipo: `Transferencia enviada a ${emailDestinatario}`,
    monto: `-${cantidad.toFixed(2)}`
  });

//Registra la  transferencia en el destinatario
  destinatario.movimientos.push({
    fecha: ahora,
    tipo: `Transferencia recibida de ${usuario.email}`,
    monto: `+${cantidad.toFixed(2)}`
  });

  //usuarios.findIndex(...): Recorre el array usuarios y busca el índice (posición numérica) del usuario cuyo correo electrónico coincida con el del usuario actual (usuario.email)

  const ubicacionUsuario = usuarios.findIndex(usuarioSearch => usuarioSearch.email === usuario.email);

  //usca el índice del usuario destinatario de una transferencia.Compara cada usuarioSearch.email del array con  destinatario.email.

  const ubicacionDest = usuarios.findIndex(usuarioSearch => usuarioSearch.email === destinatario.email);

  //Verifican que el índice sea válido (!== -1). Esto significa: "¿Encontramos al usuario en el array?" Si el índice es válido, actualizan el array usuarios en esa posición con la nueva información del usuario actualizado.
  if (ubicacionUsuario !== -1) {
    usuarios[ubicacionUsuario] = usuario};

  if (ubicacionDest !== -1) {
    usuarios[ubicacionDest] = destinatario};

    //Guardamos los cambios recuerden que JSON.stringify conviete la informacion a string ya que JSON  solo gurada texto plano
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  localStorage.setItem('usuarioActual', JSON.stringify(usuario));


  //Actualiza la interfaz y 
  actualizarSaldo();
  mostrarHistorial();
  mostrarPopupExito("Transferencia realizada con éxito");

 // limpia los campos del formulario asignado el a value  " "; esto setrabaj directamente del dom por que hacer un funcion serahacerlo mas largo.
  document.getElementById('emailDestinatario').value = " ";
  document.getElementById('cantidadTransferencia').value = " ";
}


//Creamos la funcion  para gistrar los movimientos 
//Agrega un nuevo movimiento al historial, guarda los cambios y actualiza la tabla
function registrarMovimiento(tipo, monto) {
  const ahora = new Date(); //Estás creando una instancia del objeto Date, que representa el momento actual (fecha y hora exactas) según el reloj del sistema del dispositivo del usuario
  const fecha = ahora.toLocaleString(); //convierte un número, fecha u objeto en una cadena de texto (string) usando formatos locales específicos (como el idioma y convenciones culturales del usuario).

  usuario.movimientos.push({
    fecha: fecha,
    tipo: tipo,
    monto: monto.toFixed(2)
  });

  guardarCambios();
  mostrarHistorial();
}


//Limpia la tabla de historial.
function mostrarHistorial() {
  const cuerpoTabla = document.getElementById('tablaHistorial');
  cuerpoTabla.innerHTML = '';

  //Si no hay movimientos, muestra un mensaje.
  if (!usuario.movimientos || usuario.movimientos.length === 0) {
    cuerpoTabla.innerHTML = '<tr><td colspan="3">Sin movimientos</td></tr>';
    return;
  }

  //Crea filas por cada movimiento registrado.
  usuario.movimientos.forEach(mov => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${mov.fecha}</td>
      <td>${mov.tipo}</td>
      <td>$${mov.monto}</td>
    `;
    cuerpoTabla.appendChild(fila);
  });
}


//Guarda los datos actualizados y oculta los formularios.
function guardarCambios() {
  const index = usuarios.findIndex(usuarioSearch => usuarioSearch.email === usuario.email);
  if (index !== -1) {
    usuarios[index] = usuario;
  };

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  localStorage.setItem('usuarioActual', JSON.stringify(usuario));
  actualizarSaldo();
  document.getElementById('formDeposito').classList.remove('active');
  document.getElementById('formRetiro').classList.remove('active');
  document.getElementById('formTransferencia').classList.remove('active');
}

//Muestra y oculta mensajes de error.
function mostrarPopupError(mensaje) {
  const popup = document.getElementById('popupError');
  const mensajeTexto = document.getElementById('mensajePopupError');
  mensajeTexto.textContent = mensaje;
  popup.classList.remove('oculto');
}

//oculta el mensaje 
document.getElementById('cerrarPopupError').addEventListener('click', () => {
  document.getElementById('popupError').classList.add('oculto');
});

//Muestra y oculta mensajes de éxito.


function mostrarPopupExito(mensaje) {
  const popup = document.getElementById('popupExito');
  const mensajeTexto = document.getElementById('mensajePopupExito');
  mensajeTexto.textContent = mensaje;
  popup.classList.remove('oculto');
}

document.getElementById('cerrarPopup').addEventListener('click', () => {
  document.getElementById('popupExito').classList.add('oculto');
});

//Elimina al usuario actual del almacenamiento y redirige al login.
function cerrarSesion() {
  localStorage.removeItem('usuarioActual');
  window.location.href = "/incioSesion.html";
}

// Asignación del evento al botón
document.getElementById('cerrarSesion').addEventListener('click', cerrarSesion);
