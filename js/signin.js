function signIn() {
  var emailInput = document.getElementById("email");
  var passwordInput = document.getElementById("password");
  var errorText = document.getElementById("errorText");

  var email = emailInput.value;
  var password = passwordInput.value;

  if (validateEmail() && validatePassword()) {
    var users = JSON.parse(localStorage.getItem("users")) || [];

    var userExists = users.some(function (user) {
      return user.email === email && user.password === password;
    });

    if (userExists) {
      // Here you can add code to perform the actual sign-in process
      alert("Sign-in successful!");
    } else {
      errorText.innerText = "Invalid email or password. Please try again.";
      errorText.style.display = "block";
    }
  }
}
