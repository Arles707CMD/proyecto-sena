document.addEventListener('DOMContentLoaded', () => {
    // --- Perfiles DEMO ---
    const profileButtons = document.querySelectorAll('.profile-btn');

    profileButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover active de todos
            profileButtons.forEach(b => b.classList.remove('active'));
            // Activar el seleccionado
            btn.classList.add('active');
        });
    });

    // --- Mostrar/ocultar contraseña ---
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', () => {
        // Cambiar tipo de input
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Cambiar ícono
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });
});