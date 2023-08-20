const API_BASE_URL = "https://nf-api.onrender.com";

// Validate email format
const validateEmail = (email) =>
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);

// Validate password length
const validatePassword = (password) => password.length >= 6;

// Register new user
async function registerUser(url, userData) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

// Event listener for sign-up button
document.getElementById("signup-button").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessageElement = document.getElementById("error-message");

  if (!validateEmail(email)) {
    errorMessageElement.textContent = "Invalid email format";
    return;
  }

  if (!validatePassword(password)) {
    errorMessageElement.textContent = "Invalid password length";
    return;
  }

  // Clear error message
  errorMessageElement.textContent = "";

  // Get user information from form input
  const user = {
    email: `${email}`,
    password: `${password}`,
  };

  const registerUrl = `${API_BASE_URL}/api/v1/social/auth/register`;
  await registerUser(registerUrl, user);
});
