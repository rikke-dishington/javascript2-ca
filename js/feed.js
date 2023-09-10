const API_BASE_URL = "https://api.noroff.dev";
const feedContainer = document.getElementById("all-posts");
const token = localStorage.getItem("accessToken");

// Authenticate
async function fetchWithToken(url, method = "GET") {
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

// Display all posts
async function displayPosts() {
  try {
    const url = `${API_BASE_URL}/api/v1/social/posts`;
    const data = await fetchWithToken(url);

    feedContainer.innerHTML = "";

    data.forEach((post) => {
      const { id, tags, title, body, media, created } = post;

      const postElement = document.createElement("div");
      postElement.classList.add("col", "my-4");
      postElement.innerHTML = `
        <img src="${media}" class="img-fluid" />
        <h3>${title}</h3>
        <p>${body}</p>
        <p>Created: ${created}</p>
        <p>Tags: ${tags}</p>
      `;

      feedContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error(error);
    feedContainer.innerHTML = "Oh no! An error occurred";
  }
}

displayPosts();

// Filter by
// Add event listener for the filter button
const filterButton = document.getElementById("filterButton");
filterButton.addEventListener("click", filterPosts);

// Function to filter posts based on the entered tag
async function filterPosts() {
  const tagFilter = document.getElementById("tagFilter").value.trim();
  const activeFilter = document.getElementById("activeFilter").value;

  if (tagFilter === "") {
    // If the filter is empty, display all posts
    displayPosts();
    return;
  }

  try {
    const url = `${API_BASE_URL}/api/v1/social/posts?_tag=${encodeURIComponent(
      tagFilter
    )}&_active=${activeFilter}`;
    const data = await fetchWithToken(url);

    feedContainer.innerHTML = "";

    data.forEach((post) => {
      const { id, tags, title, body, media, created } = post;

      const postElement = document.createElement("div");
      postElement.classList.add("col", "my-4");
      postElement.innerHTML = `
        <img src="${media}" class="img-fluid" />
        <h3>${title}</h3>
        <p>${body}</p>
        <p>Created: ${created}</p>
        <p>Tags: ${tags}</p>
      `;

      feedContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error(error);
    feedContainer.innerHTML = "Oh no! An error occurred while filtering";
  }
}
