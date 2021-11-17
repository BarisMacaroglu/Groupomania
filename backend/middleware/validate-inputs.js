const Joi = require('joi');

// Lors de la création d'un nouvel utilisateur
const signupSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(8).required()
});
exports.signup = (req, res, next) => {
  const {error, value} = signupSchema.validate(req.body);
  if (error) {
    res.status(422).json({ error: "Données saisies invalides" });
  } else {
    next();
  }
};

// lors du login utilisateur
const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(4).required()
});
exports.login = (req, res, next) => {
  const {error, value} = loginSchema.validate(req.body);
  if (error) {
    res.status(422).json({ error: "email ou mot de passe invalide" });
  } else {
    next();
  }
};

// Vérification d'un id
const idSchema = Joi.number().integer().positive().required();
exports.id = (req, res, next) => {
  const {error, value} = idSchema.validate(req.params.id);
  if (error) {
      res.status(422).json({ error: "id invalide" });
  } else {
      next();
  } 
}

// NOT APPLIED YET !!!!!!!!!!!!!!!!!!
// Lors d'une recherche d'utilisateur
const searchUserSchema = Joi.string().trim();
exports.searchUser = (req, res, next) => {
  const {error, value} = searchUserSchema.validate(req.query.name);
  if (error) {
      res.status(422).json({ error: "Données saisies invalides" });
  } else {
      next();
  } 
}

// Vérification de la description d'un utilisateur
const descriptionSchema = Joi.string().trim().required();
exports.description = (req, res, next) => {
  const {error, value} = descriptionSchema.validate(req.body.description);
  if (error) {
      res.status(422).json({ error: "Description invalide" });
  } else {
      next();
  }
}

// Lors du changement de mot de passe
const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().trim().min(8).required(),
  newPassword: Joi.string().trim().min(8).required()
});
exports.changePassword = (req, res, next) => {
  const {error, value} = changePasswordSchema.validate(req.body);
  if (error) {
    res.status(422).json({ error: "Données saisies invalides" });
  } else {
    next();
  }
};

// Lors de la publication d'un post
const postContentSchema = Joi.string().trim();
exports.postContent = (req, res, next) => {
  // SI le content est défini : validation du content
  if (req.body.content) {
    const {error, value} = postContentSchema.validate(req.body.content);
    if (error) {
      res.status(422).json({ error: "Données saisies invalides" });
    } else {
      next();
    }
  
  // SI ni la photo, ni le content est défini : requête rejettée
  } else if (!req.body.content && !req.file) {
    res.status(422).json({ error: "Envoyer au moins une image ou un texte !" });
  
  // SI le content n'est pas défini, et l'image est définie : validation déjà effectuée par multer!
  } else {
    next();
  }
};
