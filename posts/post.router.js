//basically copying and pasting everything that was normally in the server.js yesterday
const router = require("express").Router();
const db = require("../data/db");

router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      //this returns an array of post objects
      res.status(200).json(posts);
      //versus returning an object with a posts array of post objects
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
  //findById() doesn't seem to resolve to a promise? just to clarify, do all of them resolve into promises?
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
  // why is this some gnarly object? is this what a promise is?
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
module.exports = router;
