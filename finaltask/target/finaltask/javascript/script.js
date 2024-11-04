const closeButtonForLogin = document.querySelector("#close-button-for-login");
const closeButtonForAdd = document.querySelector("#close-button-for-add");
const addUserModal = document.querySelector("#add-user-modal");
const createUserButton = document.querySelector("#create-button");
const loginUserButton = document.querySelector("#login-button");
const loginUserModal = document.querySelector("#login-user-modal");
const viewDetailsButton = document.querySelector("#view-button");
const username = document.querySelector("#name");
const userPassword = document.querySelector("#userPassword");
const confirmPassword = document.querySelector("#confirm-password");
const nameError = document.querySelector("#nameError");
const passwordError = document.querySelector("#ageError");
const resetButton = document.querySelector(".reset-button");
const loginName = document.querySelector("#loginname");
const loginPassword = document.querySelector("#loginPassword");
const loginNameError = document.querySelector("#loginNameError");
const loginPasswordError = document.querySelector("#loginPasswordError");

createUserButton.addEventListener("click", () => {
  addUserModal.style.display = "flex";
});

loginUserButton.addEventListener("click", () => {
  loginUserModal.style.display = "flex";
});

closeButtonForAdd.addEventListener("click", () => {
  addUserModal.style.display = "none";
});

closeButtonForLogin.addEventListener("click", () => {
  loginUserModal.style.display = "none";
});

function viewUsers() {
  window.location.href = "/finaltask/Views";
}
viewDetailsButton.addEventListener("click", viewUsers);

username.onchange = validateUsername;
userPassword.onchange = validatePassword;
confirmPassword.oninput = validateConfirmPassword;

function validateUsername() {
  if (!username.value.trim()) {
    nameError.innerText = "User name cannot be empty.";
    username.classList.add("invalid");
    username.classList.remove("valid");
    return false;
  } else {
    nameError.innerText = "";
    username.classList.add("valid");
    username.classList.remove("invalid");
    return true;
  }
}

function validatePassword() {
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const numberRegex = /[0-9]/;

  if (!specialCharRegex.test(userPassword.value)) {
    passwordError.innerText =
      "Password must contain at least one special character.";
    userPassword.classList.add("invalid");
    userPassword.classList.remove("valid");
    return false;
  }
  if (!numberRegex.test(userPassword.value)) {
    passwordError.innerText = "Password must contain at least one number.";
    userPassword.classList.add("invalid");
    userPassword.classList.remove("valid");
    return false;
  }

  passwordError.innerText = "";
  userPassword.classList.add("valid");
  userPassword.classList.remove("invalid");
  return true;
}

function validateConfirmPassword() {
  if (userPassword.value !== confirmPassword.value) {
    passwordError.innerText = "Password does not match!";
    confirmPassword.classList.add("invalid");
    confirmPassword.classList.remove("valid");
    return false;
  } else {
    passwordError.innerText = "";
    confirmPassword.classList.add("valid");
    confirmPassword.classList.remove("invalid");
    return true;
  }
}

function validateFields() {
  const isUsernameValid = validateUsername();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  return isUsernameValid && isPasswordValid && isConfirmPasswordValid;
}

function resetValidation() {
  nameError.innerText = "";
  passwordError.innerText = "";
  username.classList.remove("valid", "invalid");
  userPassword.classList.remove("valid", "invalid");
  confirmPassword.classList.remove("valid", "invalid");
}

resetButton.onclick = resetValidation;

loginName.onchange = validateLoginUsername;
loginPassword.onchange = validateLoginPassword;

function validateLoginUsername() {
  if (!loginName.value.trim()) {
    loginNameError.innerText = "User name cannot be empty.";
    loginName.classList.add("invalid");
    loginName.classList.remove("valid");
    return false;
  } else {
    loginNameError.innerText = "";
    loginName.classList.add("valid");
    loginName.classList.remove("invalid");
    return true;
  }
}

function validateLoginPassword() {
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const numberRegex = /[0-9]/;

  if (!specialCharRegex.test(loginPassword.value)) {
    loginPasswordError.innerText =
      "Password must contain at least one special character.";
    loginPassword.classList.add("invalid");
    loginPassword.classList.remove("valid");
    return false;
  }
  if (!numberRegex.test(loginPassword.value)) {
    loginPasswordError.innerText = "Password must contain at least one number.";
    loginPassword.classList.add("invalid");
    loginPassword.classList.remove("valid");
    return false;
  }

  passwordError.innerText = "";
  userPassword.classList.add("valid");
  userPassword.classList.remove("invalid");
  return true;
}
function validateLoginFields() {
  const isUsernameValid = validateLoginUsername();
  const isPasswordValid = validateLoginPassword();

  return isUsernameValid && isPasswordValid;
}

function resetLoginValidation() {
  loginNameError.innerText = "";
  loginPasswordError.innerText = "";
  loginName.classList.remove("valid", "invalid");
  loginPassword.classList.remove("valid", "invalid");
}

document.querySelector("#login-reset-button").onclick = resetLoginValidation;

document.querySelector("#loginUserForm").onsubmit = function () {
  return validateLoginFields();
};
