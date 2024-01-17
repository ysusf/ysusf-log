
// ******* Select Elements ******
var nameInput = document.getElementById("nameInput");
var invalidName = document.getElementById("invalidName");
var existName = document.getElementById("existName");
var emailInput = document.getElementById("emailInput");
var invalidEmail = document.getElementById("invalidEmail");
var existEmail = document.getElementById("existEmail");
var passwordInput = document.getElementById("passwordInput");
var invalidPass = document.getElementById("invalidPass");
var loginBtn = document.getElementById("loginBtn");
var wrongPassEmail = document.getElementById("wrongPassEmail");
var logoutBtn = document.getElementById("logoutBtn");
var signUpLink = document.getElementById("signUpLink");
var homePage = document.getElementById("homePage");
var welcomeName = document.getElementById("welcomeName");
var title = document.querySelector("title");
// **** Inputs Validations ****
// *************************
// UserName Input Validation
// *************************
function vaildateName(userName) {
  var nameRegex = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
  return nameRegex.test(userName);
}

function invalidNameAlert() {
  if (vaildateName(nameInput.value) != true) {
    invalidName.classList.replace("d-none", "d-block");
  } else {
    invalidName.classList.replace("d-block", "d-none");
  }
}

function isNameExist(userName) {
  for (var i = 0; i < usersArr.length; i++) {
    if (usersArr[i].userNameObj == userName) {
      return true;
    }
  }
  return false;
}

function existNameAlert() {
  if (isNameExist(nameInput.value) == true) {
    existName.classList.replace("d-none", "d-block");
  } else {
    existName.classList.replace("d-block", "d-none");
  }
}

// **********************
// Email Input Validation
// **********************
function vaildateEmail(email) {
  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}

function invalidEmailAlert() {
  if (vaildateEmail(emailInput.value) != true) {
    invalidEmail.classList.replace("d-none", "d-block");
  } else {
    invalidEmail.classList.replace("d-block", "d-none");
  }
}

function isEmailExist(email) {
  for (var i = 0; i < usersArr.length; i++) {
    if (usersArr[i].userEmailObj == email) {
      return true;
    }
  }
  return false;
}

function existEmailAlert() {
  if (isEmailExist(emailInput.value) == true) {
    existEmail.classList.replace("d-none", "d-block");
  } else {
    existEmail.classList.replace("d-block", "d-none");
  }
}

// *************************
// Password Input Validation
// *************************
function vaildatePassword(password) {
  var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return passRegex.test(password);
}

function invalidPassAlert() {
  if (vaildatePassword(passwordInput.value) != true) {
    invalidPass.classList.replace("d-none", "d-block");
  } else {
    invalidPass.classList.replace("d-block", "d-none");
  }
}

function isPassExist(password) {
  for (var i = 0; i < usersArr.length; i++) {
    if (usersArr[i].userPassObj == password) {
      return true;
    }
  }
  return false;
}
// **************************
// ******** Actions *********
// **************************
if (localStorage.getItem("usersDB") != null) {
  var usersArr = JSON.parse(localStorage.getItem("usersDB"));
} else {
  var usersArr = [];
}

function clearAlerts() {
  invalidName.classList.replace("d-block", "d-none");
  invalidEmail.classList.replace("d-block", "d-none");
  invalidPass.classList.replace("d-block", "d-none");
  existName.classList.replace("d-block", "d-none");
  existEmail.classList.replace("d-block", "d-none");
  wrongPassEmail.classList.replace("d-block", "d-none");
}

function changeSignIn_Up() {
  if (signUpLink.innerHTML == "Sign up") {
    nameInput.classList.replace("d-none", "d-block");
    signUpLink.innerHTML = "Sign in";
    loginBtn.innerHTML = "Sign up";
  } else {
    nameInput.classList.replace("d-block", "d-none");
    signUpLink.innerHTML = "Sign up";
    loginBtn.innerHTML = "Login";
  }
  clearInputs();
  clearAlerts();
}

function addNewUser() {
  var newUser = {
    userNameObj: nameInput.value,
    userEmailObj: emailInput.value,
    userPassObj: passwordInput.value,
  };
  usersArr.push(newUser);
  localStorage.setItem("usersDB", JSON.stringify(usersArr));
}

function clearInputs() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}

var index;
function searchIndex(email, password) {
  index = -1;
  for (var i = 0; i < usersArr.length; i++) {
    if (
      usersArr[i].userEmailObj == email &&
      usersArr[i].userPassObj == password
    ) {
      index = i;
    }
  }
  return index;
}

function signUpFire() {
  if (
    vaildateName(nameInput.value) &&
    vaildateEmail(emailInput.value) &&
    vaildatePassword(passwordInput.value) &&
    !isNameExist(nameInput.value) &&
    !isEmailExist(emailInput.value)
  ) {
    addNewUser();
    changeSignIn_Up();
  } else {
    invalidNameAlert();
    invalidEmailAlert();
    invalidPassAlert();
    existNameAlert();
    existEmailAlert();
  }
}

function loginFire() {
  var temp = searchIndex(emailInput.value, passwordInput.value);
  if (
    vaildateEmail(emailInput.value) &&
    vaildatePassword(passwordInput.value)
  ) {
    if (temp > -1) {
      welcomeName.innerHTML = usersArr[temp].userNameObj;
      homePage.classList.replace("zindex-negative", "zindex-positive");
      titleChange();
      clearAlerts();
      clearInputs();
    } else {
      wrongPassEmail.classList.replace("d-none", "d-block");
    }
  } else {
    invalidEmailAlert();
    invalidPassAlert();
  }
}

function titleChange() {
  if (title.innerHTML == "Login / Register") {
    title.innerHTML = "Home / welcome";
  } else {
    title.innerHTML = "Login / Register";
  }
}
// **************************
// ********* Events *********
// **************************
nameInput.addEventListener("blur", function () {
  if (nameInput.value != "") {
    invalidNameAlert();
    existNameAlert();
  }
});

emailInput.addEventListener("blur", function () {
  if (emailInput.value != "") {
    invalidEmailAlert();
    if (loginBtn.innerText != "Login") {
      existEmailAlert();
    }
  }
});

passwordInput.addEventListener("blur", function () {
  if (passwordInput.value != "") {
    invalidPassAlert();
  }
});

signUpLink.addEventListener("click", function () {
  changeSignIn_Up();
});

loginBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  if (loginBtn.innerText == "Sign up") {
    signUpFire();
  } else if (loginBtn.innerText == "Login") {
    loginFire();
  }
});

logoutBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  homePage.classList.replace("zindex-positive", "zindex-negative");
  titleChange();
});
