const API_BASE_URL = "https://api.noroff.dev";

const errorMessageElement = document.getElementById("error-message");

async function loginUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    console.log(response);

    if (response.status === 200) {
      // User exists and login is successful
      const json = await response.json();
      const accessToken = json.accessToken;
      localStorage.setItem("accessToken", accessToken);
      console.log(json);
      window.location.href = "/feed.html";
    } else if (response.status === 401) {
      // User does not exist or invalid email/password
      errorMessageElement.textContent =
        "User does not exist or invalid email/password.";
    } else {
      // Handle other response status codes as needed
      errorMessageElement.textContent = "An error occurred.";
    }
  } catch (error) {
    errorMessageElement.textContent = "An error occurred.";
  }
}

document.getElementById("signin-button").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const user = {
    email: email,
    password: password,
  };

  loginUser(`${API_BASE_URL}/api/v1/social/auth/login`, user);
});
