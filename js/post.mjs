const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const API_BASE_URL = "https://api.noroff.dev";
const API_POSTS_URL = API_BASE_URL + "/api/v1/social/posts";
const API_POST_URL = `${API_POSTS_URL}/${id}`;
const token = localStorage.getItem("accessToken");

const postContainer = document.getElementById("post-container");

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

getPost();
