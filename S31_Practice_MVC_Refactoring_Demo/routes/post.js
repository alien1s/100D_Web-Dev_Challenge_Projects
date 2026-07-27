const express = require("express");

const postController = require("../controllers/post-controller");
const guardRoute = require("../middlewares/auth-protection-middleware");

const router = express.Router();

router.get("/", postController.getHome);

router.use(guardRoute);

router.get("/admin", postController.getAdmin);

router.post("/posts", postController.createPost);

router.get("/posts/:id/edit", postController.getSinglePost);

router.post("/posts/:id/edit", postController.updatePost);

router.post("/posts/:id/delete", postController.deletePost);

module.exports = router;
