const inputs = document.querySelectorAll(".input");
const form = document.querySelector("form");
const portugueseNames = {
  email: "e-mail",
  subject: "assunto",
  body: "mensagem",
};

function getErrorMessage(text) {
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error");
  errorMessage.textContent = text;
  return errorMessage;
}

function showErrorMessage(input, text) {
  const inputWrapper = input.parentNode;
  const errorMessage = getErrorMessage(text);
  const errorIcon = inputWrapper.querySelector("i");
  errorIcon.classList.remove("hidden");
  inputWrapper.appendChild(errorMessage);
}

function validateEmptyField(input, inputName) {
  if (!input.value) {
    const errorEmptyMessageText = `Campo ${portugueseNames[inputName]} não pode estar vazio.`;
    showErrorMessage(input, errorEmptyMessageText);
  }
}

function validateEmail(input, email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    const errorEmailMessageText = `Este e-mail não é válido.`;
    showErrorMessage(input, errorEmailMessageText);
  }
}

function removeAllErrors() {
  const errors = form.querySelectorAll(".error");
  const iconErrors = form.querySelectorAll("i");
  errors.forEach((error) => error.remove());
  iconErrors.forEach((iconError) => iconError.classList.add("hidden"));
}

function hasErrors() {
  return !!form.querySelector(".error");
}

function handleSubmit(event) {
  if (hasErrors()) removeAllErrors();

  inputs.forEach((input) => {
    validateEmptyField(input, input.name);
    if (input.name === "email" && input.value)
      validateEmail(input, input.value);
  });

  if (hasErrors()) event.preventDefault();
}

function showSuccessMessage() {
  const successMessage = document.querySelector(".success-message");
  const urlSearchParams = new URLSearchParams(window.location.search);

  if (urlSearchParams.size) successMessage.classList.remove("hidden");
}

form.addEventListener("submit", handleSubmit);

showSuccessMessage();
