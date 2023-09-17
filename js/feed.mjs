/**
 * Imports the fetchWithToken function from the authentication module.
 * @module authentication/authentication.mjs
 */
// Imports
import { fetchWithToken } from "./authentication/authentication.mjs";

/**
 * The base URL for API requests.
 * @constant {string}
 * The URL for retrieving posts from the API.
 * @constant {string}
 * The HTML element where all posts will be displayed.
 * @type {HTMLElement}
 * The HTML input element used for tag filtering.
 * @type {HTMLInputElement}
 * The HTML input element used for search.
 * @type {HTMLInputElement}
 * The HTML button element used to trigger tag filtering.
 * @type {HTMLButtonElement}
 * The HTML button element used to trigger searching.
 * @type {HTMLButtonElement}
 */
// Constants
const API_BASE_URL = "https://api.noroff.dev";
const API_POSTS_URL = API_BASE_URL + "/api/v1/social/posts";
const feedContainer = document.getElementById("all-posts");
const tagFilterInput = document.getElementById("tagFilter");
const searchInput = document.getElementById("searchInput");
const tagFilterButton = document.getElementById("tagFilterButton");
const searchButton = document.getElementById("searchButton");

/**
 * An array to store all posts for filtering.
 * @type {Array}
 */

let allPosts = []; // Store all posts to filter them later

/**
 * Clears the feed container by removing its contents.
 * @function clearFeedContainer
 */

function clearFeedContainer() {
  feedContainer.innerHTML = "";
}

/**
 * Displays posts in the feed container.
 * @function displayPosts
 * @param {Array} posts - An array of posts to display.
 */
function displayPosts(posts) {
  clearFeedContainer();

  for (const post of posts) {
    const { id, tags, title, body, media } = post;

    const postElement = document.createElement("div");
    postElement.classList.add("row", "my-4");
    postElement.innerHTML = `
        <img src="${media}" class="img-fluid" />
        <a href="post.html?id=${id}"
        <h3>${title}</h3>
        <p>#${tags}</p>
        <p>${body}</p>
    </a>
      `;

    feedContainer.appendChild(postElement);
  }
}

/**
 * Fetches posts from the API with authorization and displays them.
 * @async
 * @function fetchAndDisplayPosts
 * @param {string} url - The URL to fetch posts from.
 * @throws {Error} If an error occurs during the post retrieval or network request.
 */
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

/**
 * Filters posts based on tag or search query and updates the display.
 * @function filterPosts
 */
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
