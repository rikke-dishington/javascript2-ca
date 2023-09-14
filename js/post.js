// Function to open a popup window with post content by ID
function openPopup(post) {
  // Populate the popup content
  const popupTitle = document.getElementById("popup-title");
  const popupBody = document.getElementById("popup-body");
  const popupMedia = document.getElementById("popup-media");

  popupTitle.textContent = post.title;
  popupBody.textContent = post.body;
  popupMedia.src = post.media;

  // Open the popup window
  const popupTemplate = document.getElementById("popup-template").innerHTML;
  const popupWindow = window.open("", "_blank", "width=600, height=400");
  popupWindow.document.write(popupTemplate);
}

// Function to close the popup window
function closePopup() {
  if (popupWindow) {
    popupWindow.close();
  }
}

// Add event listeners to post elements
const postElements = document.querySelectorAll(".post-element");

postElements.forEach((element) => {
  element.addEventListener("click", () => {
    const postId = element.getAttribute("data-post-id");

    // Fetch the post data by ID and call openPopup
    // You should implement this API call to retrieve the post data
    // and pass it to openPopup function.

    // Example fetch call (replace with your actual API call):
    fetch(`${API_BASE_URL}/api/v1/social/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        openPopup(data); // Assuming data contains post details
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
