/**
 * The query string portion of the current document's URL.
 * @type {string}
 * An object representing the query parameters of the current URL.
 * @type {URLSearchParams}
 * The value of the "id" parameter from the URL query string.
 * @type {string|null}
 * The base URL for API requests.
 * @type {string}
 * The URL for retrieving posts from the API.
 * @type {string}
 * The URL for retrieving a specific post based on the "id" parameter.
 * @type {string|null}
 * The access token retrieved from local storage for API authorization.
 * @type {string|null}
 */

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const API_BASE_URL = "https://api.noroff.dev";
const API_POSTS_URL = API_BASE_URL + "/api/v1/social/posts";
const API_POST_URL = `${API_POSTS_URL}/${id}`;
const token = localStorage.getItem("accessToken");

/**
 * The HTML element where the post content will be displayed.
 * @type {HTMLElement}
 */
const postContainer = document.getElementById("post-container");

/**
 * Fetches and displays a post based on the "id" parameter from the URL.
 * @async
 * @function getPost
 * @throws {Error} If an error occurs during the post retrieval or network request.
 */
async function getPost() {
  try {
    const response = await fetch(API_POST_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }

    const data = await response.json();
    const { title, tags, body, media } = data;

    const postElement = document.createElement("div");
    postElement.classList.add("col", "my-4");
    postElement.innerHTML = `
        <img src="${media}" class="img-fluid" />
        <h1>${title}</h1>
        <p>#${tags}</p>
        <p>${body}</p>
        <button class="btn btn-primary" id="edit-post-button">Edit Post</button>
        <button class="btn btn-danger" id="delete-post-button">Delete Post</button>
      `;

    postContainer.appendChild(postElement);
  } catch (error) {
    console.log(error);
  }
}
// Call the getPost function to retrieve and display the post.
getPost();
