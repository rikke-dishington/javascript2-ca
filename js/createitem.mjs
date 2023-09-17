/**
 * The base URL for the API.
 * @type {string}
 * The URL for posting new social media posts.
 * @type {string}
 * The access token retrieved from local storage for API authorization.
 * @type {string|null}
 */

// Constants
const API_BASE_URL = "https://api.noroff.dev";
const API_POSTS_URL = API_BASE_URL + "/api/v1/social/posts";
const token = localStorage.getItem("accessToken");

/**
 * Handles the submission to create create a new post
 * and send it to the api with the POST method
 * @param {Event} event - The form submission event (publish button).
 * @param {string} [method="POST"] - The HTTP method to use for the api request.
 */

async function createPost(event) {
  event.preventDefault();

  // Get form input values
  const image = document.getElementById("postImage").value;
  const title = document.getElementById("postTitle").value;
  const description = document.getElementById("postDescription").value;
  const tag = document.getElementById("postTag").value;

  // Create a new post object
  const newPost = {
    media: image,
    title: title,
    body: description,
    tags: [tag],
  };

  try {
    // Make a POST request to the API
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPost),
    };

    const response = await fetch(API_POSTS_URL, postOptions);

    if (response.ok) {
      window.location.href = "feed.html";
    } else {
    }
  } catch (error) {
    console.error("An error occurred", error);
  }
}

// Add an event listener to the form for form submission
const newPostForm = document.getElementById("newPostForm");
newPostForm.addEventListener("submit", createPost);
