const API_BASE_URL = "https://api.noroff.dev";
const feedContainer = document.getElementById("all-posts");
const token = localStorage.getItem("accessToken");

// Function to create a new post on the API
async function createPostOnAPI(postData) {
  try {
    const url = "https://api.noroff.dev/social/posts";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const newPost = await response.json();
      console.log("New post created:", newPost);
      alert("Post created successfully!"); // Display a success message
      // You can choose to redirect to another page or update the UI as needed.
    } else {
      console.error("Failed to create post:", response.statusText);
      alert("Failed to create post. Please try again."); // Display an error message
    }
  } catch (error) {
    console.error("Error creating post:", error);
    alert("An error occurred while creating the post."); // Display an error message
  }
}

// Event listener for the form submission
const createPostForm = document.getElementById("createPostForm");
createPostForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Gather the data from the form
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  // Create and add a new post to the API
  const newPostData = {
    title,
    body,
  };

  createPostOnAPI(newPostData);
});
