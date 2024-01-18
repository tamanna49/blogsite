// Importing required modules
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import _ from "lodash";
import generateURL from "./src/createURL.js";
import contactMail from "./src/sendEmail.js";
import publishDate from "./src/date.js";
import deleteAllPost from "./src/blogApi.js";
import Blogpost from "./src/Models/BlogPost.js";

const app = express();

// Seting up app.js
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Database Integration
const password = process.env.PASSWORD;
mongoose.connect(
  `mongodb+srv://ashusharma07:${password}@cluster0.j5rug.mongodb.net/blogpostDB`
);

// Render Blogpost on homepage

app.get("/", function (req, res) {
  Blogpost.find((err, foundPost) => {
    if (!err) {
      res.render("home", {
        blogPosts: foundPost,
      });
    } else {
      console.log(err);
    }
  });
});

// Render Contact Page

app.get("/contact", function (req, res) {
  res.render("contact");
});

// Render About Page

app.get("/about", function (req, res) {
  res.render("about");
});

// Render Compose Page

app.get("/compose", function (req, res) {
  res.render("login");
});

app.post("/login", (req, res) => {
  const userName = req.body.userName;
  const userPassword = req.body.password;
  if (userName === process.env.UNAME && userPassword === process.env.UPASS) {
    res.render("compose");
  } else {
    res.render("login");
  }
});

// Add BlogPost to Database

app.post("/compose", function (req, res) {
  const myblogpost = new Blogpost({
    postTitle: req.body.postTitle,
    postContent: req.body.postContent,
    postAuthor: req.body.postAuthor,
    postDate: publishDate(),
    postURL: generateURL(req.body.postTitle),
    imgUrl: req.body.imgUrl,
    imgAlt: req.body.imgAlt,
  });
  myblogpost.save((err) => {
    if (!err) {
      res.redirect("/");
    }
  });
});

// Render BlogPost pages

app.get("/posts/:postName", function (req, res) {
  const urlEntered = req.params.postName.trim();
  Blogpost.find({ postURL: urlEntered }, (err, foundPost) => {
    if (!err) {
      //console.log(foundPost);
      res.render("post", { blogPost: foundPost[0] });
    } else {
      res.render("404");
    }
  });
});

// Handles contact request

app.post("/contact", function (req, res) {
  /// console.log(req.body);
  contactMail(req.body.userName, req.body.userEmail, req.body.userMessege);
  res.render("sent");
});

app.post("/delete", function (req, res) {
  Blogpost.deleteOne({ postURL: req.body.postId }, (err) => {
    if (err) {
      console.log(err);
      res.render("compose");
    } else {
      res.redirect("/");
    }
  });
});

// Delete All the BlogPost

app.delete("/delete", (req, res) => {
  Blogpost.deleteMany({}, (err) => {
    if (!err) {
      res.send("Successfully deleted all articles");
    } else {
      res.send(err);
    }
  });
});

// Handle Delete All Post Request

app.post("/deleteAll", (req, res) => {
  deleteAllPost();
  res.redirect("/");
});

// Handle invalid request 404

app.get("*", function (req, res) {
  res.render("404");
});

// Listening for HTTPs request on the specific port

const port = 3002;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
