import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Post2() {
    const [content, setContent] = useState("");
    // Comment mettre un fichier image dans le 'state' ?
    const [imageFile, setImageFile] = useState({});
    const [listOfPosts, setListOfPosts] = useState([]);

    const headers = {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
    };

    let history = useHistory();

    useEffect(() => {  
    Axios.get("http://localhost:3001/posts", headers)
      .then((response) => {
        console.log(response.data.results);
        setListOfPosts(response.data.results);
      })
      .catch((error) => console.log(error));
    }, []);

    const newPost = (e) => {
        e.preventDefault();
        console.log(content);
        console.log(imageFile);
        console.log(imageFile.name);
        Axios.post("http://localhost:3001/posts/new", headers, {
            content: content,
            file: imageFile,
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => console.log(error));
        
    }
    return (
        <div className="posts__container">
            <h1>POSTS PAGE</h1>
            <div className="new_post_form_container">
                <form>
                    <label>Partagez qqch</label>
                    <input type="text" id="post_content" name="content" placeholder="Dites quelque chose..." onChange={(e) => setContent(e.target.value)}></input>
                    <input type="file" id="post_imageurl" name="imageurl" accept=".jpeg,.jpg,.gif" onChange={(e) => setImageFile(e.target.files[0])}></input>
                    <button className="btn" name="share-btn" onClick={newPost}>Partager</button>
                    <div className="newpost_error">Error!</div>
                </form>
            </div>
            <div className="all_posts">
                {listOfPosts.map((value, key) => {

                    return (
                        <div className="post" onClick={() => {history.push(`/posts/${value.id}`)}}>
                            <p>User id : {value.user_id} donc user name: X </p>
                            <p className="post__text">User a dit : {value.content} </p>
                            <img className="post_image" alt="" src={value.image_url}/>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Post2
