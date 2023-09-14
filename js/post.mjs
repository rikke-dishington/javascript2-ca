// Imports
import { fetchWithToken } from "./authentication/authentication.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const API_BASE_URL = "https://api.noroff.dev";
const API_POSTS_URL = API_BASE_URL + "/api/v1/social/posts";
const API_POST_URL = `${API_POSTS_URL}/${id}`;

const postContainer = document.getElementById("post-container");

async function getPost() {
  try {
    const data = await fetchWithToken(API_POST_URL);
    const { title, tags, body, media } = data;

    const postElement = document.createElement("div");
    postElement.classList.add("col", "my-4");
    postElement.innerHTML = `
        <img src="${media}" class="img-fluid" />
        <h1>${title}</h1>
        <p>#${tags}</p>
        <p>${body}</p>
      `;

    postContainer.appendChild(postElement);
  } catch (error) {
    console.log(error);
  }
}

getPost();
