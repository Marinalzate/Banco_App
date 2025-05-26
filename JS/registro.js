<script>
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const password = document.getElementById('password');
    const confirmar = document.getElementById('confirmar');

    form.addEventListener('submit', function (event) {
        // Validar que las contraseñas coincidan
        if (password.value !== confirmar.value) {
            event.preventDefault(); // Detiene el envío del formulario
            alert('Las contraseñas no coinciden.');
            confirmar.focus();
        }

        // Puedes agregar más validaciones aquí si lo necesitas
        // Ejemplo: Validar campos vacíos manualmente (aunque el atributo `required` ya hace esto)
    });
});
</script>
