/**
 * This will fetch json data from the api
 * with JWT authentication using the GET method
 * and store the authorization in the localStorage
 * @param {string} url - The api to fetch data from.
 * @param {string} [method="GET"] - The HTTP method to use for the request (default is "GET").
 * @returns {Promise<any>} A Promise that resolves to the parsed JSON response if the request is successful.
 * @throws {Error} If the request fails or encounters an error, it throws an Error with details.
 */

const token = localStorage.getItem("accessToken");

// Authenticate
export async function fetchWithToken(url, method = "GET") {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(url, { method, headers });

    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
