const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require("../db");
const db = database.getDB();

exports.signup = (req, res, next) => {
    console.log("Entered to signup controller");

    bcrypt.hash(req.body.password, 10).then(hashedPassword => {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = hashedPassword;
        let isAdmin;

        // Si le nombre d'utilisateur est zéro, le premier utilisateur qui créé son compte sera admin.
        db.query("SELECT COUNT(*) AS nbOfUsers FROM users", (err, result) => {
            if(err) {
                console.log(err);
                res.status(500).json({ "error": error.sqlMessage });
            } else {
                console.log(result);
                if(result[0].nbOfUsers === 0) {
                    isAdmin = 1;
                } else {
                    isAdmin = 0;
                }

                db.query("INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES (?, ?, ?, ?, ?)", [firstName, lastName, email, password, isAdmin], (err, result) => {
                    if(err) {
                        console.log(err);
                        res.status(500).json({ "error": error.sqlMessage });
                    }
                    res.send(result);
                });
            }
        })
    }).catch(error => res.status(500).json({ error }));
}