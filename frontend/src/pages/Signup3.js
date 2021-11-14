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
                <form id="form" class="form">
                    <div class="form-control">
                        <label for="firstName">Prénom</label>
                        <input type="text" id="firstName" name="firstName" required/>
                    </div>
                    <div class="form-control">
                        <label for="lastName">Nom</label>
                        <input type="text" id="lastName" name="lastName" required/>
                    </div>
                    <div class="form-control">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" name="email" required/>
                    </div>
                    <div class="form-control">
                        <label for="password">Mot de passe</label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    <div class="form__error"></div>
                    <button class="signup__btn">S'inscrire</button>
                </form>
            </div>
        </section>
    )
}

export default Signup3
