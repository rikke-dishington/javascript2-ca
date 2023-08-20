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

    // Clear any previous error message
    document.getElementById("error-message").textContent = "";

    alert("Sign in successful!");
    // Perform further actions after successful sign-in
  } catch (error) {
    console.log(error);

    document.getElementById("error-message").textContent =
      "Invalid email or password.";
  }
}

// Event listener for sign-in button
document.getElementById("signin-button").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const storedUser = JSON.parse(localStorage.getItem(email));

  if (storedUser && storedUser.password === password) {
    const userToLogin = {
      email: `${email}`,
      password: `${password}`,
    };

    const loginUrl = `${API_BASE_URL}/api/v1/social/auth/login`;
    loginUser(loginUrl, userToLogin);
  } else {
    document.getElementById("error-message").textContent =
      "User does not exist or invalid email/password.";
  }
});
