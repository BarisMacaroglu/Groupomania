require("dotenv").config({
    path: "./config.env"
});

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/", userRoutes);
app.use("/posts", postRoutes);


module.exports = app;