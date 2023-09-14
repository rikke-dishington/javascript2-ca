// Imports
import { fetchWithToken } from "./authentication/authentication.mjs";

// Constants
const API_BASE_URL = "https://api.noroff.dev";
const API_POSTS_URL = API_BASE_URL + "/api/v1/social/posts";
const feedContainer = document.getElementById("all-posts");
const tagFilterInput = document.getElementById("tagFilter");
const searchInput = document.getElementById("searchInput");
const tagFilterButton = document.getElementById("tagFilterButton");
const searchButton = document.getElementById("searchButton");

let allPosts = []; // Store all posts to filter them later

// Function to clear the feed container
function clearFeedContainer() {
  feedContainer.innerHTML = "";
}

// Function to display posts
function displayPosts(posts) {
  clearFeedContainer();

  for (const post of posts) {
    const { id, tags, title, body, media } = post;

    const postElement = document.createElement("div");
    postElement.classList.add("col", "my-4");
    postElement.innerHTML = `
    <a href="post.html?id=${id}"
        <img src="${media}" class="img-fluid" />
        <h3>${title}</h3>
        <p>#${tags}</p>
        <p>${body}</p>
    </a>
      `;

    feedContainer.appendChild(postElement);
  }
}

// Function to fetch and display posts
async function fetchAndDisplayPosts(url) {
  try {
    const data = await fetchWithToken(url);
    allPosts = data; // Store all posts in the allPosts variable
    displayPosts(allPosts); // Display the fetched posts
  } catch (error) {
    console.error(error);
    feedContainer.innerHTML = "Oh no! An error occurred";
  }
}

// Function to filter posts by tag or search query
function filterPosts() {
  const tagFilter = tagFilterInput.value.trim();
  const searchQuery = searchInput.value.trim().toLowerCase();

  if (tagFilter) {
    const url = `${API_POSTS_URL}?_tag=${tagFilter}`;
    fetchAndDisplayPosts(url);
  } else if (searchQuery) {
    const postBySearch = allPosts.filter((post) => {
      const { title, body, tags } = post;
      return (
        title.toLowerCase().includes(searchQuery) ||
        body.toLowerCase().includes(searchQuery) ||
        tags.some((tag) => tag.toLowerCase().includes(searchQuery))
      );
    });
    displayPosts(postBySearch);
  } else {
    // If both tag filter and search query are empty, display all posts
    fetchAndDisplayPosts(API_POSTS_URL);
  }
}

// Add event listeners for filtering by tag and searching
tagFilterButton.addEventListener("click", filterPosts);
searchButton.addEventListener("click", filterPosts);

// Display all posts initially
fetchAndDisplayPosts(API_POSTS_URL);
