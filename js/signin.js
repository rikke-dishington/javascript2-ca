const API_BASE_URL = "https://nf-api.onrender.com";

async function loginUser(url, userData) {
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
    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);
    return json;
  } catch (error) {
    errorMessageElement.textContent =
      "User does not exist or invalid email/password.";
  }
}

// Event listener for sign-in button
document.getElementById("signup-button").addEventListener("click", () => {
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
