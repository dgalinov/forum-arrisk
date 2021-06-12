import React, { useState, useEffect } from 'react';
import Comment from './comment.component';
import { FaThumbsUp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';

const Post = (props) => {
    const {
        user,
        username,
        imageUrl
    } = props;
    const [likes, setLikes] = useState(props.location.state.post.likes);
    const [owner, setOwner] = useState(false);
    const history = useHistory();
    const id_post = props.location.state.post.id_post;
    console.log(props.location.state.post);
    // const componentDidMount = () => {
    //     console.log(id_post);
    //     firebase.firestore().collection('likes')
    //     .where("id_post", "==", id_post)
    //     .get()
    //     .then((querySnapshot) => {
    //         const dataSnapshot = [];
    //         querySnapshot.forEach((doc) => {
    //             console.log(doc.id, " => ", doc.data());
    //             dataSnapshot.push({...doc.data(), id: doc.id});
    //         });
    //         setLikes(dataSnapshot[0].likes);
    //     })
    //     .catch((error) => {
    //         console.log("Error getting documents: ", error);
    //     });
    // }
    const handleLikes = () => {
        firebase.firestore().collection("likes").add({
            UID: user.email,
            id_post: id_post,
            likes: likes,
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
    const deletePost = () => {
        firebase.firestore().collection("posts").doc(id_post).delete()
        .then(() => {
            history.push('/post-list');
        });
    }
    useEffect(() => {
        if (user.email === props.location.state.post.UID) {
            setOwner(true);
        }
        // componentDidMount();
    }, [user.email, props.location.state.post.UID]);
    return (
        <div className="container">
            <div className="col-lg-8">
                <div className="panel panel-post">
                    {owner ?
                        <div className="post-updaters">
                            <button className="btn btn-outline-warning btn-posts">
                                <Link to={{ pathname: `/update-post`, state:{ id_post: id_post, post: props.location.state } }} className="nav-link">
                                Update
                                </Link>
                            </button>
                            <Popup trigger={<button className="btn btn-outline-danger btn-posts" >Delete</button>} position="right center">
                                <div>Popup content here !!</div>
                            </Popup>
                            
                        </div>
                        :
                        null
                    }
                    <div className="post-title">
                        <h3>{props.location.state.post.title}</h3>
                        <button className="like-button" onClick={handleLikes}>{props.location.state.post.likes} <FaThumbsUp fill="#ff9400" stroke="#ff9400" viewBox="0 0 512 700" height="2em" /></button>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: props.location.state.post.description }}></p>
                    {props.location.state.post.image_urls.map((image_url, i) => (
                        <img
                        key={i}
                        style={{ width: "500px" }}
                        src={ image_url || "http://via.placeholder.com/300" }
                        alt="firebase-image"
                        />
                    ))}
                    <div className="post-categories">
                        Categories:
                        {props.location.state.post.category.map((cat, i) => (
                            <p key={i}>{cat.value}</p>
                        ))}
                    </div>
                    <div>
                        
                    </div>
                    
                </div>
                <Comment user = { user } id_post = { id_post } username = { username } imageUrl = { imageUrl } />
            </div>
        </div>
    );
};

export default Post;