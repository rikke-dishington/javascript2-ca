/**
 * The base URL for API requests.
 * @type {string}
 */
const API_BASE_URL = "https://api.noroff.dev";

/**
 * The HTML element used to display error messages.
 * @type {HTMLElement}
 */
const errorMessageElement = document.getElementById("error-message");

/**
 * Attempts to log in a user by sending a POST request to the specified URL with user data.
 *
 * @async
 * @function loginUser
 * @param {string} url - The URL to which the login request is sent.
 * @param {Object} data - An object containing user login data.
 * @param {string} data.email - The user's email.
 * @param {string} data.password - The user's password.
 * @throws {Error} If an error occurs during the login process or network request.
 */
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

/**
 * Event listener for the "Sign In" button click event.
 * Retrieves user input, calls loginUser, and initiates login.
 * @event
 */
document.getElementById("signin-button").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const user = {
    email: email,
    password: password,
  };

  loginUser(`${API_BASE_URL}/api/v1/social/auth/login`, user);
});
