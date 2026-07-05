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

const collapseButtonListElement = document.createElement("button");
collapseButtonListElement.id = "collapse-comments-btn";
collapseButtonListElement.className = "btn btn-alt";
collapseButtonListElement.textContent = "Collapse Comments";

function collapseCommentList() {
  commentSectionElement.innerHTML = `
    <p>
      This post might have comments. You can load them if you want to view them.
    </p>
    <button id="load-comments-btn" class="btn btn-alt" data-postid="<%= post._id %>">Load Comments</button>
  `;

  const newLoadCommentsBtn = document.getElementById("load-comments-btn");
  newLoadCommentsBtn.addEventListener("click", fetchCommentsForPost);
}

async function fetchCommentsForPost() {
  const postId = loadCommentsBtnElement.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json();
  console.log(responseData);

  if (responseData && responseData.length > 0) {
    const commentsListElement = createCommentsList(responseData);
    commentSectionElement.innerHTML = "";
    commentSectionElement.append(
      commentsListElement,
      collapseButtonListElement,
    );
  } else {
    commentSectionElement.firstElementChild.textContent =
      "We could not found any comment, maybe add some!";
  }
}

async function saveComment(event) {
  event.preventDefault();
  const postId = commentFormElement.dataset.postid;

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  console.log(enteredText, enteredTitle);
  const comment = {
    title: enteredTitle,
    text: enteredText,
  };

  const response = await fetch(`/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": "application/json",
    },
  });

  commentTextElement.value = "";
  commentTitleElement.value = "";

  fetchCommentsForPost();
}

loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);
collapseButtonListElement.addEventListener("click", collapseCommentList);
commentFormElement.addEventListener("submit", saveComment);
