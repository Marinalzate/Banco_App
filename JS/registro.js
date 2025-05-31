
  // Esperar a que el DOM esté cargado
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Evita que la página se recargue

      // Obtener los valores del formulario
      const nombre = document.getElementById('nombre').value.trim();
      const apellidos = document.getElementById('apellidos').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmar = document.getElementById('confirmar').value;

    const pinValido = /^\d{4}$/;
      // Validación básica
      const errorDiv = document.getElementById('errorMensaje');
errorDiv.classList.add('oculto'); // Oculta errores anteriores


if (password !== confirmar) {
  errorDiv.textContent = 'Las contraseñas no coinciden';
  errorDiv.classList.remove('oculto');

   setTimeout(() => {
    errorDiv.classList.add('oculto');
  }, 3000);

  return;
}
if (!pinValido.test(password)) {
  errorDiv.textContent = 'La contraseña debe tener exactamente 4 números (sin letras ni símbolos)';
  errorDiv.classList.remove('oculto');
  setTimeout(() => {
    errorDiv.classList.add('oculto');
  }, 3000);
  return;
}

      // Crear objeto de usuario
      const nuevoUsuario = {
        nombre,
        apellidos,
        email,
        password, // Nota: en una app real, deberías cifrar esto
      };

      // Obtener usuarios existentes de localStorage
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

      // Validar si el correo ya está registrado
      const existe = usuarios.some(user => user.email === email);
      if (existe) {
        const popupError = document.getElementById('popupError');
popupError.classList.remove('oculto');

document.getElementById('cerrarPopupError').onclick = () => {
  popupError.classList.add('oculto');
};
return;
       
      }

      // Agregar nuevo usuario y guardar en localStorage
      usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

// Mostrar pop-up
const popup = document.getElementById('popupExito');
popup.classList.remove('oculto');

// Limpiar formulario
form.reset();
document.getElementById('cerrarPopup').onclick = () => {
  popup.classList.add('oculto');
};
    });
  });

