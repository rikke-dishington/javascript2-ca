// Register new user ---------------------------
async function registerUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    const json = await response.json();
  } catch (error) {
    //const errorMessage = "The user already exist";
    //document.getElementById("error-message").textContent = errorMessage;
    console.log(error);
  }
}

// get info from sign in form
const userToRegister = {};

const registerUrl = `${API_BASE_URL}/api/v1/social/auth/register`;

registerUser(registerUrl, userToRegister);

// ---------------

function validateEmail() {
  var emailInput = document.getElementById("email");
  var emailError = document.getElementById("emailError");

  var email = emailInput.value;

  // Regular expression for basic email validation
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!email.match(emailRegex)) {
    emailError.innerText = "Please enter a valid email address.";
    emailInput.classList.add("error");
    return false;
  } else {
    emailError.innerText = "";
    emailInput.classList.remove("error");
    return true;
  }
}

function validatePassword() {
  var passwordInput = document.getElementById("password");
  var passwordError = document.getElementById("passwordError");

  var password = passwordInput.value;

  if (password.length < 6) {
    passwordError.innerText = "Password must be at least 6 characters.";
    passwordInput.classList.add("error");
    return false;
  } else {
    passwordError.innerText = "";
    passwordInput.classList.remove("error");
    return true;
  }
}

function signIn() {
  if (validateEmail() && validatePassword()) {
    // Here you can add code to perform the actual sign-in process
    alert("Sign-in successful!");
  }
}

//
