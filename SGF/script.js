const formulario = document.getElementById('form');

formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const correo = document.getElementById('correo').value;
  const password = document.getElementById('password').value;

  // Validar correo electrónico
  if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,}$/.test(correo)) {
    document.getElementById('error-correo').textContent = 'Correo electrónico inválido';
    return;
  }

  // Validar contraseña (ejemplo básico)
  if (password.length < 8) {
    document.getElementById('error-contrasena').textContent = 'La contraseña debe tener al menos 8 caracteres';
    return;
  }

  // Validar otros campos según sea necesario

  // Si todas las validaciones son correctas, redirigir a la página principal
  window.location.href = 'main.html';
});