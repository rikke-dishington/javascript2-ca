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

// Function to display all posts
async function displayPosts() {
  try {
    const url = `${API_BASE_URL}/api/v1/social/posts`;
    const data = await fetchWithToken(url);

    feedContainer.innerHTML = "";

    for (const post of data) {
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
    }
  } catch (error) {
    console.error(error);
    feedContainer.innerHTML = "Oh no! An error occurred";
  }
}

displayPosts();

// Function to filter posts based on the entered tag
async function filterPosts() {
  const tagFilter = document.getElementById("tagFilter").value.trim();

  if (tagFilter === "") {
    // If the filter is empty, display all posts
    displayPosts();
    return;
  }

  try {
    const url = `${API_BASE_URL}/api/v1/social/posts?_tag=${tagFilter}`;
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

// Add event listeners
const filterButton = document.getElementById("filterButton");
filterButton.addEventListener("click", filterPosts);

/*
// Search
// Function to search and filter posts based on a search query
async function searchPosts() {
  const searchInput = document.getElementById("searchInput");

  if (searchInput === "") {
    // If the search query is empty, display all posts
    displayPosts();
    return;
  }

  const searchText = searchInput.value.toLowerCase();

  try {
    const url = `${API_BASE_URL}/api/v1/social/posts?_q=${encodeURIComponent(
      searchInput
    )}&_fields=title,body,created`; // Add _fields parameter to specify the fields to search in
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
    feedContainer.innerHTML = "Oh no! An error occurred while searching";
  }
}

// Add event listeners
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", searchPosts);

*/
