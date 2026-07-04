const loadCommentsBtnElement = document.getElementById("load-comments-btn");
const commentSectionElement = document.getElementById("comments");
const commentFormElement = document.querySelector("#comments-form form");
const commentTitleElement = document.getElementById("title");
const commentTextElement = document.getElementById("text");

function createCommentsList(comments) {
  const commentsListElement = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
    <article class="comment-item">
      <h2>${comment.title}</h2>
      <p>${comment.text}</p>
    </article>
    `;
    commentsListElement.appendChild(commentElement);
  }

  return commentsListElement;
}

async function fetchCommentsForPost() {
  const postId = loadCommentsBtnElement.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json();
  console.log(responseData);
  const commentsListElement = createCommentsList(responseData);
  commentSectionElement.innerHTML = "";
  commentSectionElement.appendChild(commentsListElement);
}

function saveComment(event) {
  event.preventDefault();
  const postId = commentFormElement.dataset.postid;

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  console.log(enteredText, enteredTitle);
  const comment = {
    title: enteredTitle,
    text: enteredText,
  };

  fetch(`/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);

commentFormElement.addEventListener("submit", saveComment);
