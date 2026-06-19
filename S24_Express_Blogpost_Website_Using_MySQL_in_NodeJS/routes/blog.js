const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const db = require("../data/database-conection");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const queryPath = path.join(
    __dirname,
    "..",
    "sql",
    "queries",
    "get_posts_with_authors.sql",
  );
  const query = await fs.readFile(queryPath, "utf-8");
  const [posts] = await db.query(query);
  res.render("posts-list", { posts: posts });
});

router.get("/new-post", async function (req, res) {
  const queryPath = path.join(
    __dirname,
    "..",
    "sql",
    "queries",
    "get-all-authors.sql",
  );
  const query = await fs.readFile(queryPath, "utf-8");
  const [authors] = await db.query(query);
  res.render("create-post", { authors: authors });
});

router.post("/posts", async function (req, res) {
  const queryPath = path.join(
    __dirname,
    "..",
    "sql",
    "queries",
    "insert-new-post.sql",
  );
  const query = await fs.readFile(queryPath, "utf-8");
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];
  await db.query(query, data);

  res.redirect("/posts");
});

router.get("/posts/:id", async function (req, res) {
  const postId = req.params.id;
  const queryPath = path.join(
    __dirname,
    "..",
    "sql",
    "queries",
    "get_single_post.sql",
  );
  const query = await fs.readFile(queryPath, "utf-8");
  const [post] = await db.query(query, postId);
  if (!post || post.length === 0) {
    return res.statusCode(404).render("404");
  }
  res.render("post-detail", { post: post[0] });
});

module.exports = router;
