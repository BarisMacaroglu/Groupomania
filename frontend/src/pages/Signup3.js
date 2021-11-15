import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function Signup3() {
  return (
    <section id="signup">
      <div class="form__container">
        <div class="header">
          <h2>S'inscrire</h2>
        </div>
        <form class="form">
          <div class="form-control">
            <label for="firstName">Prénom *</label>
            <input type="text" id="firstName" name="firstName" placeholder="Votre prénom" required />
          </div>
          <div class="form-control">
            <label for="lastName">Nom *</label>
            <input type="text" id="lastName" name="lastName" placeholder="Votre nom" required />
          </div>
          <div class="form-control">
            <label for="email">E-mail *</label>
            <input type="email" id="email" name="email" placeholder="Votre adresse e-mail"required />
          </div>
          <div class="form-control">
            <label for="password">Mot de passe *</label>
            <input type="password" id="password" name="password" placeholder="Votre mot de passe" required />
          </div>
          <button class="auth__btn">S'inscrire</button>
          <div class="form__error"></div>
        </form>
      </div>
    </section>
  );
}

export default Signup3;
