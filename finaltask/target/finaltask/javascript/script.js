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
const passwordError = document.querySelector("#passwordError");
const resetButton = document.querySelector(".reset-button");
const loginName = document.querySelector("#loginname");
const loginPassword = document.querySelector("#loginPassword");
const loginNameError = document.querySelector("#loginNameError");
const loginPasswordError = document.querySelector("#loginPasswordError");
const confirmPasswordError = document.querySelector("#confirmPasswordError");

createUserButton.addEventListener("click", () => {
  addUserModal.style.display = "flex";
  document.getElementById('name').focus();
});

loginUserButton.addEventListener("click", () => {
  loginUserModal.style.display = "flex";
  document.getElementById('loginname').focus();
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
    displayErrorMessage(nameError, username, "User name Field is Empty.");
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
  if (!userPassword.value.trim()) {
    displayErrorMessage(passwordError, userPassword, "Password Field is Empty.");
    return false;

  }

  if (!specialCharRegex.test(userPassword.value)) {
    displayErrorMessage(passwordError, userPassword, "Password must contain at least one special character.");
    return false;
  }

  passwordError.innerText = "";
  userPassword.classList.add("valid");
  confirmPassword.classList.add("valid");

  userPassword.classList.remove("invalid");
  return true;
}
function validateConfirmPassword() {
  if (!userPassword.value.trim()) {
    displayErrorMessage(passwordError, confirmPassword, " Password Field is Empty.");

    return false;
  }
  if (!confirmPassword.value.trim()) {
    displayErrorMessage(confirmPasswordError, confirmPassword, " Confirm Password Field is Empty.");

    return false;
  }
  if (!userPassword.value.trim() && !confirmPassword.value.trim()) {
    displayErrorMessage(passwordError, confirmPassword, " Password Field is Empty.");
    displayErrorMessage(confirmPasswordError, confirmPassword, "Confirm Password Field is Empty.");

    return false;
  }
  if (userPassword.value !== confirmPassword.value) {
    displayErrorMessage(passwordError, confirmPassword, "Password Does not Match.");
    return false;
  }
  if (!confirmPassword.value.trim()) {
    displayErrorMessage(confirmPasswordError, confirmPassword, "Confirm Password Field is Empty.");
    return false;
  }
  else {
    passwordError.innerText = "";
    confirmPasswordError.innerText = "";
    confirmPassword.classList.add("valid");
    confirmPassword.classList.remove("invalid");
    return true;
  }
}


const errorMessage = document.querySelector(".error-message");

function validateFields() {
  const isUsernameValid = validateUsername();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  if (!isUsernameValid) {
    username.focus();
  } else if (!isPasswordValid) {
    userPassword.focus();
  } else if (!isConfirmPasswordValid) {
    confirmPassword.focus();
  }

  return isUsernameValid && isPasswordValid && isConfirmPasswordValid;
}

function resetValidation() {
  nameError.innerText = "";
  passwordError.innerText = "";
  errorMessage.innerText = "";
  confirmPasswordError.innerText = "";
  username.classList.remove("valid", "invalid");
  username.focus();
  userPassword.classList.remove("valid", "invalid");
  confirmPassword.classList.remove("valid", "invalid");
}

resetButton.onclick = resetValidation;

loginName.onchange = validateLoginUsername;
loginPassword.onchange = validateLoginPassword;

function validateLoginUsername() {
  if (!loginName.value.trim()) {
    displayErrorMessage(loginNameError, loginName, "User name Field is empty.");
    return false;
  } else {
    loginNameError.innerText = "";
    loginName.classList.add("valid");
    loginName.classList.remove("invalid");
    return true;
  }
}

function validateLoginPassword() {
  if (!loginPassword.value.trim()) {
    displayErrorMessage(loginPasswordError, loginPassword, "Password Field is Empty.");
    return false;
  } else {
    loginPasswordError.innerText = "";
    loginPassword.classList.add("valid");
    loginPassword.classList.remove("invalid");
    return true;
  }
}
function validateLoginFields() {
  const isUsernameValid = validateLoginUsername();
  const isPasswordValid = validateLoginPassword();

  if (!isUsernameValid && !isPasswordValid) {
    loginName.focus();
  } else if (!isUsernameValid) {
    loginName.focus();
  } else if (!isPasswordValid) {
    loginPassword.focus();
  }

  return isUsernameValid && isPasswordValid;
}

function resetLoginValidation() {
  loginNameError.innerText = "";
  loginPasswordError.innerText = "";
  loginName.classList.remove("valid", "invalid");
  loginName.focus();
  loginPassword.classList.remove("valid", "invalid");
}

document.querySelector("#login-reset-button").onclick = resetLoginValidation;

document.querySelector("#loginUserForm").onsubmit = function () {
  return validateLoginFields();
};

function displayErrorMessage(selector, inputField, message) {
  selector.innerText = message;
  selector.style.visibility = "visible";
  inputField.classList.add("invalid");
  inputField.classList.remove("valid");
  inputField.focus();

  setTimeout(() => {
    selector.innerText = "";
    selector.style.visibility = "hidden";

    inputField.classList.remove("invalid");
  }, 5000)

}
