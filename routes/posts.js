import express from 'express'
import { nanoid } from 'nanoid'

const router = express.Router()

import '../util/db_conn.js'
import Post from '../schema/post.model.js'

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find({});
  try {
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Get a single post
router.get("/:id", async (req, res) => {
  const postId = req.params.id
  try {
    const post = await Post.findOne({postId: postId});
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Add a new document to the collection
router.post("/", async (req, res) => {
  let data = req.body
  if (!data.postId) {
    data.postId = nanoid()
  }
  const newPost = new Post(data)
  try {
    await newPost.save();
    res.send(newPost);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Update/Edit post
router.put("/edit", async (req, res) => {
  const {data, postId} = req.body
  try {
    const post = await Post.findOneAndUpdate({postId}, data, {
      new: true
    });
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete post
router.delete("/:id", async (req, res) => {
  const postId = req.params.id
  try {
    const result = await Post.findOneAndDelete({postId});
    if(result) {
      res.send({message:"Deleted Successfully", postId})
    } else {  
      res.status(400).send({message:"Post Not found!", postId})
    }
  } catch (error) {
    res.status(500).send(error);
  }
})

export default router