import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Signup2() {

    let history = useHistory();

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(3).max(15).required(),
        lastName: Yup.string().min(4).max(20).required(),
        email: Yup.string().min(4).max(20).required(),
        password: Yup.string().min(4).max(20).required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/signup", data)
        .then((response) => {
            console.log(response);
            // A welcome and 'thank you for joining' message ?
            history.push("/");
        })
        .catch((error) => console.log(error));
    }

    
    return (
        <div className="form__container">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="signup__form">
                    <label>Prénom</label>
                    <ErrorMessage name="first_name" component="span" />
                    <Field autocomplete="off" type="text" id="first_name" name="first_name" placeholder="Prénom"/>

                    <label>Nom</label>
                    <ErrorMessage name="last_name" component="span" />
                    <Field autocomplete="off" type="text" id="last_name" name="last_name" placeholder="Nom"/>

                    <label>Adresse e-mail</label>
                    <ErrorMessage name="email" component="span" />
                    <Field autocomplete="off" type="email" id="email" name="email" placeholder="Adresse e-mail"/>

                    <label>Mot de passe</label>
                    <ErrorMessage name="password" component="span" />
                    <Field autocomplete="off" type="password" id="password" name="password" placeholder="Mot de passe"/>

                    <button className="btn" type="submit">S'inscrire</button>
                </Form>
            </Formik>

            <div>Vous avez déjà un compte ? <Link to="/login">Connectez-vous ici</Link> </div>
        </div>
    )
}

export default Signup2
