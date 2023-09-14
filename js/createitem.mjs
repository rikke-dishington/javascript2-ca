// Constants
const API_BASE_URL = "https://api.noroff.dev";
const API_POSTS_URL = API_BASE_URL + "/api/v1/social/posts";
const token = localStorage.getItem("accessToken");

// Function to handle form submission
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
      // Post was successfully created
      console.log("Post created successfully");
    } else {
      console.error("Error creating post");
    }
  } catch (error) {
    console.error("An error occurred", error);
  }
}

// Add an event listener to the form for form submission
const newPostForm = document.getElementById("newPostForm");
newPostForm.addEventListener("submit", createPost);
