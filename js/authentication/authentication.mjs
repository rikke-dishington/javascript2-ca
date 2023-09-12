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
