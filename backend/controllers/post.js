const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require("../db");
const db = database.getDB();

exports.newPost = (req, res, next) => {
  console.log("create new Post ctrl'a girdi");

    const userId = req.body.userId;
    const imageurl = req.body.file ? `${req.protocol}://${req.get('host')}/images/${req.body.file.name}` : null;
    const content = req.body.content ? req.body.content : null;
  
    db.query("INSERT INTO posts (user_id, image_url, content)\
    VALUES (?, ?, ?)", [userId, imageurl, content], (error, results) => {
      if (error) {
        res.status(500).json({ "error": error.sqlMessage });
      } else {
        res.status(201).json({ message: 'Publication ajoutée' });
      }
    });
}

const sqlforUserIdOnPosts = "SELECT Posts.id AS postId, Posts.publication_date AS postDate, Posts.imageurl AS postImage, Posts.content as postContent, Users.id AS userId, Users.name AS userName, Users.pictureurl AS userPicture\
FROM Posts INNER JOIN Users ON Posts.user_id = Users.id ORDER BY postDate DESC"
const firefoxtan = "Posts INNER JOIN Users ON Posts.user_id = Users.id ORDER BY postDate DESC"

const primarySql = "SELECT * FROM posts ORDER BY publication_date DESC"

exports.getAllPosts = (req, res, next) => {

  db.query(primarySql, (error, results) => {
    if(error) {
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      res.status(200).json({ results });
    }
  })
}

exports.getOnePost = (req, res, next) => {
  const id = req.params.id;
  db.query("SELECT * FROM posts WHERE id = ?", [id], (error, results) => {
    if(error) {
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      res.status(200).json({ results });
    }
  })
}


exports.deletePost = (req, res, next) => {

  const postId = parseInt(req.params.id, 10);

  db.query("DELETE FROM posts WHERE id = ?", [postId], (error, results) => {
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      res.status(201).json({ message: 'Publication supprimée' });
    }
  });
}