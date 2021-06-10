import React, { useState, useEffect } from 'react';
import Comment from './comment.component';
import { FaThumbsUp } from "react-icons/fa";
import firebase from '../firebase';

const PostList = (props) => {
    const {
        user,
        username,
        imageUrl
    } = props;
    const [likes, setLikes] = useState(0);
    const id_post = props.location.state.post.id_post;
    const componentDidMount = () => {
        console.log(id_post);
        firebase.firestore().collection('likes')
        .where("id_post", "==", id_post)
        .get()
        .then((querySnapshot) => {
            const dataSnapshot = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                dataSnapshot.push({...doc.data(), id: doc.id});
            });
            setLikes(dataSnapshot[0].likes);
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }
    const handleLikes = () => {
        
        firebase.firestore().collection("likes").add({
            UID: user.email,
            id_post: id_post,
            likes: 3,
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            // window.location.reload();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
    useEffect(() => {
        componentDidMount();
    });
    return (
        <div className="container">
            <div className="col-lg-8">
                <div className="panel panel-post">
                    <div>
                        <h3 className="h3-post" >{props.location.state.post.title}</h3>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: props.location.state.post.description }}></p>
                    {props.location.state.post.image_urls.map((image_url, i) => (
                        <img
                        key={i}
                        style={{ width: "500px" }}
                        src={image_url || "http://via.placeholder.com/300"}
                        alt="firebase-image"
                        />
                    ))}
                    <div className="post-categories">
                        Categories:
                        {props.location.state.post.category.map((cat, i) => (
                            <p key={i}>{cat.value}</p>
                        ))}
                    </div>
                    {props.location.state.post.likes}
                    <button className="like-button" onClick={handleLikes}><FaThumbsUp className="like-icon-button" /></button>
                </div>
                <Comment user = { user } id_post = { id_post } username = { username } imageUrl = { imageUrl } />
            </div>
        </div>
    );
};

export default PostList;