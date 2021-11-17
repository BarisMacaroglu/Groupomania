const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require("../db");
const db = database.getDB();

exports.signup = (req, res, next) => {

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
                db.query("INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES (?, ?, ?, ?, ?)", [firstName, lastName, email, password, isAdmin], (error, results) => {
                  if(error) {
                    if (error.errno === 1062) { // ERREUR : email déjà utilisé dans la base
                      res.status(403).json({ "error": "L'email est déjà utilisé !" });
                    } else { // Autre erreur SQL
                      res.status(500).json({ "error": error.sqlMessage });
                    }
                  } else { // Pas d'erreur : utilisateur ajouté
                    res.status(201).json({ message: 'Utilisateur créé' });
                  }
                });
            }
        });
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

                const token = jwt.sign(
                  { userId: result[0].id },
                  process.env.SECRET_KEY,
                  { expiresIn: '24h' }
                );

                res.status(200).json({
                    message: 'User logged in',
                    userId: result[0].id,
                    firstName: result[0].first_name,
                    lastName: result[0].last_name,
                    imageUrl: result[0].image_url,
                    isAdmin: result[0].is_admin,
                    token: token
                });
            })
            .catch(error => res.status(500).json({ error })); 
        }
    })
}

exports.logout = (req, res, next) => {
    console.log("Entered to log out controller");
    res.status(200).json({ message: "utilisateur déconnecté" });
}

exports.getCurrentUser = (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const searchId = decodedToken.userId;
  // const searchId = cookie.userId;

  db.query("SELECT id, first_name, last_name, image_url, is_admin FROM users WHERE id = ?", [searchId], (error, results) => {
    // SI : erreur SQL
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });

    // SI : Utilisateur non trouvé
    } else if (results.length === 0) {
      res.status(401).json({ error: "Utilisateur non trouvé" });

    // SI : Utilisateur trouvé
    } else {
      res.status(200).json({
        userId: results[0].id,
        firstName: results[0].first_name,
        lastName: results[0].last_name,
        imageUrl: results[0].image_url,
        isAdmin: results[0].is_admin
      });
    }
  });
}

exports.getAllUsers = (req, res, next) => {
    console.log("Entered to getAllUsers controller");

    db.query("SELECT id, first_name, last_name, image_url FROM users ORDER BY first_name", (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).json({ err });
        } else {
            res.status(200).json({ results });
        }
    });
}

exports.searchUsers = (req, res, next) => {

    const searchTerm1 = "%" + req.query.firstName + "%";
    const searchTerm2 = "%" + req.query.lastName + "%";

    db.query("SELECT id, first_name, last_name, image_url FROM users WHERE first_name OR last_name LIKE ?;", [searchTerm1, searchTerm2], (error, results) => {
      if (error) {
        res.status(500).json({ "error": error.sqlMessage });
      } else {
        res.status(200).json({ results });
      }
    });
}

exports.getOneUser = (req, res, next) => {

    const searchId = req.params.id;

    db.query("SELECT * FROM users WHERE id = ?", [searchId], (error, results) => {
      // SI : erreur SQL
      if (error) {
        res.status(500).json({ "error": error.sqlMessage });
  
      // SI : Utilisateur non trouvé
      } else if (results.length === 0) {
        res.status(401).json({ error: "Utilisateur non trouvé" });
  
      // SI : Utilisateur trouvé
      } else {
        res.status(200).json({
          userId: results[0].id,
          firstName: results[0].first_name,
          lastName: results[0].last_name,
          email: results[0].email,
          imageUrl: results[0].image_url,
          description: results[0].description,
          isAdmin: results[0].is_admin
        });
      }
    });
}

exports.changeDescription = (req, res, next) => {

    const description = req.body.description;
    const userId = req.params.id;

    db.query("UPDATE users SET description = ? WHERE id = ?", [description, userId], (error, results) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.status(201).json({ message: 'Description du profil modifiée' });
      }
    });
}

exports.changeProfilePicture = (req, res, next) => {

    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const userId = req.params.id;

    db.query("UPDATE users SET image_url=? WHERE id = ?", [imageUrl, userId], (error, results) => {
      if (error) {
        res.status(500).json({ "error": error.sqlMessage });
      } else {
        res.status(201).json({ message: 'Photo de profil modifiée' });
      }
    });
}

exports.changePassword = (req, res, next) => {
    
    const searchId = req.params.id;
    
    db.query("SELECT password FROM users WHERE id = ?", [searchId], (error, results) => {
      if (error) {
        res.status(500).json({ "error": error.sqlMessage });
      } else {
        const DBHashedPassword = results[0].password;
        bcrypt.compare(req.body.oldPassword, DBHashedPassword)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Ancien mot de passe incorrect!' });
            }
            // L'ancien mot de passe est correct :
            bcrypt.hash(req.body.newPassword, 10)
              .then(hash => {
                const newPassword = hash;
                
                db.query("UPDATE users SET password = ? WHERE id = ?", [newPassword, searchId], (error, results) => {
                  if (error) {
                    res.status(500).json({ "error": error.sqlMessage });
                  } else {
                    res.status(201).json({ message: 'Mot de passe modifié' });
                  }
                })
              })
              .catch(error => res.status(500).json({ error }));
          })
          .catch(error => res.status(500).json({ error }));
      }
    });
}

exports.changeAdmin = (req, res, next) => {

    const isAdmin = req.body.isAdmin;
    const userId = req.params.id;

    db.query("UPDATE users SET is_admin = ? WHERE id = ?", [isAdmin, userId], (error, results) => {
      if (error) {
        res.status(500).json({ "error": error.sqlMessage });
      } else {
        res.status(201).json({ message: "Droits d'administrateur modifiée" });
      }
    });
}

exports.deleteAccount = (req, res, next) => {

  console.log("entered to ctrl delete account");
  const userId = req.params.id;
    // const token = req.headers.authorization.split(' ')[1];
    // const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    // const userId = decodedToken.userId;
  console.log(userId);

  db.query("DELETE FROM users WHERE id = ?", [userId], (error, results) => {
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      res.status(201).json({ message: 'Utilisateur supprimé' });
    }
  });
}
