const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require("../db");
const db = database.getDB();

exports.newPost = (req, res, next) => {
  
    const userId = req.body.userId;
    const imageurl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
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