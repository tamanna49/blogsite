import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Schema for blogPost

const postSchema = new Schema({
  postTitle: String,
  postContent: String,
  postAuthor: String,
  postDate: String,
  postURL: String,
  imgUrl: String,
  imgAlt: String,
});

// Create blogPost collection Model

const Blogpost = mongoose.model("Blogpost", postSchema);

export default Blogpost;
