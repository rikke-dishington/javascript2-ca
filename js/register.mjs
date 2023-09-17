/**
 * The base URL for API requests.
 * @type {string}
 */
const API_BASE_URL = "https://api.noroff.dev";

/**
 * Validates the format of a user's name and
 * returns an error message if invalid.
 * @function validateUserName
 * @param {string} name - The user's name to validate.
 * @returns {string|null} An error message if the name format is invalid; otherwise, null.
 */

const validateUserName = (name) => {
  const errorMessageElement = document.getElementById("name-error-message");
  if (/^[a-zA-Z0-9_]+$/.test(name)) {
    errorMessageElement.textContent = "";
    return null; // Name is valid
  } else {
    errorMessageElement.textContent =
      "Name format is invalid. Only alphanumeric characters and underscores are allowed";
    return "Name format is invalid.";
  }
};

/**
 * Validates the format of a user's email and checks if it ends with "@noroff.no" or "@stud.noroff.no".
 *
 * @function validateEmail
 * @param {string} email - The user's email to validate.
 * @returns {string|null} An error message if the email format is invalid or doesn't match the expected domain; otherwise, null.
 */

const validateEmail = (email) => {
  const errorMessageElement = document.getElementById("email-error-message");
  const emailFormatRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const noroffEmailSuffix = "@noroff.no";
  const studNoroffEmailSuffix = "@stud.noroff.no";

  if (
    emailFormatRegex.test(email) &&
    (email.endsWith(noroffEmailSuffix) || email.endsWith(studNoroffEmailSuffix))
  ) {
    errorMessageElement.textContent = "";
    return null; // Email is valid
  } else {
    errorMessageElement.textContent =
      "Email format is invalid or does not end with @noroff.no or @stud.noroff.no";
    return "Email format is invalid.";
  }
};

/**
 * Validates the length of a user's password
 * and returns an error message if invalid.
 * @function validatePassword
 * @param {string} password - The user's password to validate.
 * @returns {string|null} An error message if the password length is insufficient; otherwise, null.
 */

const validatePassword = (password) => {
  const errorMessageElement = document.getElementById("password-error-message");
  if (password.length >= 8) {
    errorMessageElement.textContent = "";
    return null; // Password is valid
  } else {
    errorMessageElement.textContent = "Password must be at least 8 characters";
    return "Password must be at least 8 characters.";
  }
};

/**
 * Registers a new user by sending a POST request
 * with user data to the specified URL.
 * @async
 * @function registerUser
 * @param {string} url - The URL to which the registration request is sent.
 * @param {Object} data - An object containing user registration data.
 * @param {string} data.name - The user's name.
 * @param {string} data.email - The user's email.
 * @param {string} data.password - The user's password.
 * @returns {Promise<Object|null>} A Promise that resolves to the JSON response or null if an error occurs.
 * @throws {Error} If an error occurs during the registration process or network request.
 */
// Register new user
async function registerUser(url, data) {
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
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Event listener for the "Sign Up" button click event.
 * Retrieves user input, performs validation, and initiates user registration.
 * @event
 */

document.getElementById("signup-button").addEventListener("click", () => {
  const userName = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const nameError = validateUserName(userName);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (!nameError && !emailError && !passwordError) {
    const user = {
      name: userName,
      email: email,
      password: password,
    };
    registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, user);
  } else {
    console.log("Validation failed. User cannot be registered.");
  }
});
