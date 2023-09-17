/**
 * The query string portion of the current document's URL.
 * @type {string}
 * An object representing the query parameters of the current URL.
 * @type {URLSearchParams}
 * The value of the "id" parameter from the URL query string.
 * @type {string|null}
 * The base URL for API requests.
 * @constant {string}
 * The URL for deleting a specific post based on the "id" parameter.
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
 * Deletes a post by sending a DELETE request to the API.
 * @async
 * @function deletePost
 * @throws {Error} If an error occurs during the post deletion or network request.
 */
async function deletePost() {
  try {
    const response = await fetch(API_POST_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }

    // Redirect to a different page or show a success message
    window.location.href = "feed.html"; // Redirect to the feed page after deletion
    console.log("Post deleted successfully");
  } catch (error) {
    console.error("An error occurred while deleting the post", error);
  }
}

/**
 * Event listener that triggers post deletion
 * when the "Delete Post" button is clicked.
 * @event
 * @param {Event} event - The click event object.
 */
document.addEventListener("click", function (event) {
  if (event.target.id === "delete-post-button") {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost();
    }
  }
});
