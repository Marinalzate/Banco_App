document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const errorDiv = document.getElementById('errorMensaje');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      // Obtener usuarios guardados
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

      // Buscar si existe un usuario con ese correo y contraseña
      const usuarioValido = usuarios.find(user => user.email === email && user.password === password);

      if (usuarioValido) {
      
        errorDiv.classList.add('oculto');
         window.location.href= "/cuenta.html";
         localStorage.setItem('usuarioActual', JSON.stringify(usuarioValido));
      } else {
        // Mostrar error
        errorDiv.classList.remove('oculto');

        setTimeout(() => {
          errorDiv.classList.add('oculto');
        }, 3000);
      }
    });
  });