//basically copying and pasting everything that was normally in the server.js yesterday
const router = require("express").Router();
const db = require("../data/db");

//setting up first test route
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
      return post.length
        ? res.status(200).json(post)
        : res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
    })
    .catch(err => {
      console.log("Could not find post ${id} internally", err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

module.exports = router;
