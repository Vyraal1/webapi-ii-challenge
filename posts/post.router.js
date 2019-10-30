//basically copying and pasting everything that was normally in the server.js yesterday
const router = require("express").Router();
const db = require("../data/db");

// GET requests
router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
      // ? should I versus returning an object with a posts array of post objects
      // res.status(200).json({ posts: posts });
    })
    .catch(err => {
      console.log("Could not get all posts internally", err);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  // ? findById() doesn't seem to resolve to a promise? just to clarify, do all of them resolve into promises?
  db.findById(id)
    .then(post => {
      throw err;
      post.length
        ? res.status(200).json(post)
        : res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
    })
    .catch(err => {
      console.log(`Could not find post ${id} internally`, err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
  const postID = req.params.id;
  // ? why is this some gnarly object? is this what a promise is?
  // console.log("comments", db.findPostComments(postID));
  db.findPostComments(postID)
    .then(comments => {
      // findPostsComments returns an empty array if not found
      comments.length
        ? res.status(200).json(comments)
        : res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
    })
    .catch(err => {
      console.log(
        `Internal error: could not find comments from post ${postID}`,
        err
      );
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

// POST requests
router.post("/", (req, res) => {
  const newPost = req.body;
  const { title, body } = newPost;

  // minor data sanitation
  // ? is there a way to do this with a ternary?
  if (!title || !body) {
    res.status(400).json({
      errorMessage: "Please provide both title and contents for the post."
    });
  }

  db.insert(newPost)
    // ? what should this be called?
    .then(confirmation => {
      // ? do you need to send the entire confirmation object back or just the ID?
      // ? Do I have to do a nested promise to go back into the db? since it only returns the post ID
      // ? or do I only return the old body and why do we even do that?
      res.status(201).json(newPost);
    })
    .catch(err => {
      console.log("Internal error on inserting a new post", err);
      res
        .status(500)
        .json(
          `{ error: "There was an error while saving the post to the database"}`
        );
    });
});

router.post("/:id/comments", (req, res) => {
  const postID = req.params.id;
  // creating a new comment object with the id
  const comment = { ...req.body, post_id: postID };
  //checking if it's a valid comment
  if (!comment.text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    db.insertComment(comment)
      .then(newComment => {
        res.status(201).json(newComment);
      })
      .catch(err => {
        console.log(`Internal error on finding post ${postID}`, err);
        res.status(500).json({
          error: "There was an error while saving the comment to the database"
        });
      });
  }
});

module.exports = router;
