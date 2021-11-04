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
app.use('/images', express.static(path.join(__dirname, 'images')));

const userRoutes = require("./routes/user");

app.use("/", userRoutes);


module.exports = app;