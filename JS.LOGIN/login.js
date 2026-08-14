// login.js
// NOTA: este archivo asume que existe un endpoint real en el backend
// (/api/auth/login) que valida credenciales y devuelve el rol del usuario
// autenticado. El rol NUNCA se decide en el cliente.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const toggleBtn = document.getElementById("togglePassword");
  const loginBtn = document.getElementById("loginBtn");
  const errorBox = document.getElementById("loginError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const demoBox = document.getElementById("demoBox");

  // ---------------------------------------------------------------
  // 1) Mostrar/ocultar contraseña (accesible con teclado)
  // ---------------------------------------------------------------
  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    toggleBtn.setAttribute("aria-pressed", String(isPassword));
    toggleBtn.setAttribute(
      "aria-label",
      isPassword ? "Ocultar contraseña" : "Mostrar contraseña"
    );
    toggleBtn.querySelector("i").className = isPassword
      ? "fa-regular fa-eye-slash"
      : "fa-regular fa-eye";
  });

  // ---------------------------------------------------------------
  // 2) Selector de perfil DEMO — solo precarga datos de prueba.
  //    Debe eliminarse o esconderse en producción (ver comentario en HTML).
  // ---------------------------------------------------------------
  const DEMO_CREDENTIALS = {
    admin: "admin@sistemaGP.com",
    supervisor: "supervisor@sistemaGP.com",
    empleado: "empleado@sistemaGP.com",
  };

  if (demoBox) {
    demoBox.querySelectorAll(".profile-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        demoBox
          .querySelectorAll(".profile-btn")
          .forEach((b) => {
            b.classList.remove("active");
            b.setAttribute("aria-pressed", "false");
          });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");

        const role = btn.dataset.role;
        emailInput.value = DEMO_CREDENTIALS[role] || "";
      });
    });
  }

  // ---------------------------------------------------------------
  // 3) Validación + envío del formulario
  // ---------------------------------------------------------------
  function showFieldError(el, message) {
    el.textContent = message;
  }

  function clearErrors() {
    errorBox.hidden = true;
    errorBox.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
  }

  function setLoading(isLoading) {
    loginBtn.disabled = isLoading;
    loginBtn.querySelector(".btn-text").textContent = isLoading
      ? "Ingresando..."
      : "Iniciar Sesión";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors();

    let valid = true;

    if (!emailInput.value.trim()) {
      showFieldError(emailError, "El correo es obligatorio.");
      valid = false;
    } else if (!emailInput.checkValidity()) {
      showFieldError(emailError, "Ingresa un correo válido.");
      valid = false;
    }

    if (!passwordInput.value) {
      showFieldError(passwordError, "La contraseña es obligatoria.");
      valid = false;
    } else if (passwordInput.value.length < 8) {
      showFieldError(passwordError, "Debe tener al menos 8 caracteres.");
      valid = false;
    }

    if (!valid) return;

    setLoading(true);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput.value.trim(),
          password: passwordInput.value,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        errorBox.textContent =
          data.message || "Credenciales incorrectas. Intenta de nuevo.";
        errorBox.hidden = false;
        return;
      }

      const data = await response.json();
      // El backend debe devolver el rol y un token/sesión válida.
      // Aquí solo se redirige; el rol nunca se determina en el cliente.
      window.location.href = data.redirectUrl || "/dashboard";
    } catch (err) {
      errorBox.textContent =
        "No se pudo conectar con el servidor. Intenta más tarde.";
      errorBox.hidden = false;
    } finally {
      setLoading(false);
    }
  });
});