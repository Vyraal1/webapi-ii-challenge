const express = require("express");
const server = express();

// separating all `/api/posts` into an express router
const postsRouter = require("./posts/post.router");

//figure out what this does again
server.use(express.json());

//adding the postsRouter
server.use("/api/posts", postsRouter);

server.listen(5000, () => console.log("Listening on Port 5000"));
