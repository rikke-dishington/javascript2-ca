// Event listener for sign-in button
document.getElementById("signin-button").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessageElement = document.getElementById("error-message");

  // Clear error message
  errorMessageElement.textContent = "";

  // Get user information from form input
  const user = {
    email: `${email}`,
    password: `${password}`,
  };

  const loginUrl = `${API_BASE_URL}/api/v1/social/auth/login`;
  await loginUser(loginUrl, user);
});
