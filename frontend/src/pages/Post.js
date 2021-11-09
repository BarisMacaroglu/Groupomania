import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

function Post() {
    const initialValues = {
        content: "",
        imageurl: "",
    }

    const validationSchema = Yup.object().shape({
        content: Yup.string()
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="posts__container">
            <h1>POSTS PAGE</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label>Partagez qqch</label>
                    <Field id="post_content" name="content" placeholder="Dites quelque chose..."></Field>
                    <Field id="post_imageurl" name="imageurl" type="file" accept=".jpeg,.jpg,.gif"></Field>
                    <button type="submit" className="btn" name="share-btn">Partager</button>
                    <ErrorMessage name="share-btn" component="span" />
                </Form>
            </Formik>

            <div>Burada tüm postslar file d'actualité olarak gelecek</div>
        </div>
    )
}

export default Post

// initialValues={} onSubmit={} validationSchema={}