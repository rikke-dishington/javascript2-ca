const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const API_BASE_URL = "https://api.noroff.dev";
const API_POSTS_URL = API_BASE_URL + "/api/v1/social/posts";
const API_POST_URL = `${API_POSTS_URL}/${id}`;
const token = localStorage.getItem("accessToken");

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

document.addEventListener("click", function (event) {
  if (event.target.id === "delete-post-button") {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost();
    }
  }
});
