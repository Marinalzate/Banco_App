
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Evita que la página se recargue

      // Obtener los valores del formulario
      const nombre = document.getElementById('nombre').value.trim(); //elimina los espacios
      const apellidos = document.getElementById('apellidos').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmar = document.getElementById('confirmar').value;

       // Validación básica  nopermite que no se use algo que no sea numero y minimo 4 de ellos.
    const pinValido = /^\d{4}$/;
     

      //constante del  mensaje de error que se muestra dentro del form.
      const error = document.getElementById('errorMensaje');
error.classList.add('oculto'); 

 // Oculta errores anteriores
if (password !== confirmar) {

  //esta linea no es redundante por que  asegura  que el mensaje  a mostrar sea el adecuado incluso  si ya esta pre definido en el html.
  error.textContent = 'Las contraseñas no coinciden';
  error.classList.remove('oculto');

   setTimeout(() => {
    error.classList.add('oculto');
  }, 3000);

  return; //detiene la función donde está, evitando que se siga ejecutando el código que viene después (como registrar un usuario, guardar datos)
}

  //valida lo ingresado en la contraseña cumpla las condiciones.
if (!pinValido.test(password)) {
  error.textContent = 'La contraseña debe tener exactamente 4 números (sin letras ni símbolos)';
  error.classList.remove('oculto');
  setTimeout(() => {
    error.classList.add('oculto');
  }, 6000);
  return;
}

      // Crear objeto de usuario
      const nuevoUsuario = {
        nombre,
        apellidos,
        email,
        password
      };

      // Obtener usuarios existentes de localStorage
      const usuarios = JSON.parse(localStorage.getItem("usuarios") || '[]');

      // Validar si el correo ya está registrado

      //.some() recorre el array y devuelve true si al menos un elemento cumple la condición.

      const existe = usuarios.some(user => user.email === email);
      if (existe) {
        // muestra el error  con u pop up si  existe el usuario
        const popupError = document.getElementById('popupError');
popupError.classList.remove('oculto');

        // funcion felcha  para agregar oculto en el boton y cerrar el popup
document.getElementById('cerrarPopupError').onclick = () => {
  popupError.classList.add('oculto');
};
return;
       
      }

      // Agregar nuevo usuario y guardar en localStorage
      usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); // JSON.stringify() onvierte el array de objetos usuarios en una cadena de texto (JSON), porque localStorage solo puede guardar texto, no objetos directamente.




// Mostrar Mensajes de error o exito  de la accion 
const popup = document.getElementById('popupExito');
popup.classList.remove('oculto');



// Limpiar formulario
/* form.reset();
Esta línea:

Limpia todos los campos del formulario (<input>, <textarea>, <select>, etc.).

Los valores se restablecen a su estado original (generalmente vacío)./*/

form.reset();
document.getElementById('cerrarPopup').onclick = () => {
  popup.classList.add('oculto');
};
    });
  

