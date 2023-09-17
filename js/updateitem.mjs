const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const API_BASE_URL = "https://api.noroff.dev";
const API_POSTS_URL = API_BASE_URL + "/api/v1/social/posts";
const API_POST_URL = `${API_POSTS_URL}/${id}`;
const token = localStorage.getItem("accessToken");

// Define the postContainer variable
const postContainer = document.getElementById("post-container");

document.addEventListener("click", function (event) {
  if (event.target.id === "edit-post-button") {
    fetchPostDataAndEdit();
  }
});

async function fetchPostDataAndEdit() {
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

    // Populate the edit form with postData
    populateEditForm(title, tags, body, media);
  } catch (error) {
    console.error("An error occurred while fetching post data", error);
  }
}

function populateEditForm(title, tags, body, media) {
  const editForm = document.createElement("form");
  editForm.innerHTML = `
      <h2>Edit Post</h2>
      <div class="mb-3">
        <label for="editPostTitle" class="form-label">Title:</label>
        <input class="form-control" type="text" id="editPostTitle" value="${title}">
      </div>
      <div class="mb-3">
        <label for="editPostTags" class="form-label">Tags:</label>
        <input class="form-control" type="text" id="editPostTags" value="${tags}">
      </div>
      <div class="mb-3">
        <label for="editPostBody" class="form-label">Body:</label>
        <textarea class="form-control" id="editPostBody" rows="3">${body}</textarea>
      </div>
      <div class="mb-3">
        <label for="editPostMedia" class="form-label">Media URL:</label>
        <input class="form-control" type="url" id="editPostMedia" value="${media}">
      </div>
      <button class="btn btn-light" id="save-edited-post-button">Save Changes</button>
    `;

  // Replace the existing post container with the edit form
  postContainer.innerHTML = "";
  postContainer.appendChild(editForm);
}

document.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.id === "save-edited-post-button") {
    handleEditFormSubmission();
  }
});

async function handleEditFormSubmission() {
  const editedPostData = {
    title: document.getElementById("editPostTitle").value,
    tags: document.getElementById("editPostTags").value.split(","),
    body: document.getElementById("editPostBody").value,
    media: document.getElementById("editPostMedia").value,
  };

  try {
    const response = await fetch(API_POST_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedPostData),
    });

    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }

    // Redirect to the post page after successful update
    window.location.href = `feed.html`;

    // Handle successful update, e.g., show a success message or redirect
    console.log("Post updated successfully");
  } catch (error) {
    console.error("An error occurred while updating the post", error);
  }
}
