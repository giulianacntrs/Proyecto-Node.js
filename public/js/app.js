document.querySelector("#loginForm").addEventListener("submit", (e) => {
  e.preventDefault();  

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  clearErrors();

  if (!isFormValid(email, password)) {
    showError("email", "Por favor, ingresa un correo electrónico válido.");
    showError("password", "La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  if (email === "giulianacanteros15@gmail.com" && password === "hola123") {
    localStorage.setItem("loggedIn", true);
    window.location.href = "catalogo.html";  
  } else {
    alert("Credenciales incorrectas");
  }
});

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const isFormValid = (email, password) => {
  return validateEmail(email) && validatePassword(password);
};

const showError = (field, message) => {
  const fieldElement = document.querySelector(`#${field}`);
  const errorElement = document.createElement("span");
  errorElement.classList.add("error-message");
  errorElement.style.color = "red";
  errorElement.textContent = message;

  if (!fieldElement.parentNode.querySelector(".error-message")) {
    fieldElement.parentNode.appendChild(errorElement);
  }
};

const clearErrors = () => {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((error) => error.remove());
};
