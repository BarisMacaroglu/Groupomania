const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require("../db");
const db = database.getDB();