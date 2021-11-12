import React, { useState } from "react";
// import React from "react";
// import Axios from "axios";
// import { useHistory } from "react-router-dom";

function Post3() {

    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const imageData = document.querySelector("input[type='file']").files[0];
        formData.append('image', imageData);
        formData.append('content', content);

        fetch("http://localhost:3001/posts/new", {
            method: 'post',
            headers: { authorization: "Bearer " + localStorage.getItem("token") },
            body: formData,
        }).then((response) => {
            console.log(response);
        }).catch((error) => console.log(error));
    }
    return (
        <div>
            <div>
                <h3>Create Post</h3>
                <form onSubmit={handleSubmit}>
                    <input type='file'></input>
                    <input type='text' onChange={(e) => setContent(e.target.value)}></input>
                    <button type='submit'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default Post3
