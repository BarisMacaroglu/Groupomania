const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cookies = require('cookies');
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

exports.login = (req, res, next) => {

    console.log("Entered to login controller");

    const researchedEmail = req.body.email;

    db.query("SELECT * FROM users WHERE email = ?", [researchedEmail], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({ "error": error.sqlMessage });
        } else if (result.length === 0) {
            res.status(401).json({ error: "Utilisateur non trouvé !" });
        } else {
            const passwordInDB = result[0].password;

            bcrypt.compare(req.body.password, passwordInDB)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                const newToken = jwt.sign(
                    { userId: result[0].id },
                    process.env.SECRET_KEY,
                    { expiresIn: '24h' }
                );

                // Envoi du token & userId dans un cookie
                const cookieContent = {
                    token: newToken,
                    userId: result[0].id
                };

                // console.log(cookieContent);

                new Cookies(req, res).set('snToken', cookieContent, {
                    httpOnly: true,
                    maxAge: 3600000  // cookie pendant 1 heure
                });

                res.status(200).json({
                    message: 'User logged in',
                    userId: result[0].id,
                    firstName: result[0].first_name,
                    lastName: result[0].last_name,
                    imageUrl: result[0].image_url,
                    isAdmin: result[0].is_admin
                });

            })
            .catch(error => res.status(500).json({ error })); 
        }
    })
}