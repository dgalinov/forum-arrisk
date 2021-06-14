import React, { useState, useEffect } from 'react';
import Comments from './comments.component';
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import { useHistory } from 'react-router-dom';

const Post = (props) => {
    const {
        user,
        username,
        imageUrl
    } = props;
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [owner, setOwner] = useState(false);
    const history = useHistory();
    const id_post = props.location.state.post.id_post;
    const commentsList = () => {
        firebase.firestore().collection('comments')
        .where("id_post", "==", id_post)
        .get()
        .then((querySnapshot) => {
            const dataSnapshot = [];
            querySnapshot.forEach((doc) => {
                dataSnapshot.push({...doc.data(), id: doc.id});
            });
            setComments(dataSnapshot);
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }
    const countLikes = () => {
        firebase.firestore().collection('likes').doc(props.location.state.post.UID+id_post)
        .get()
        .then((doc) => {
            if (doc.exists) {
                setLiked(doc.data().liked);
            } else {
                firebase.firestore().collection("likes").doc(props.location.state.post.UID+id_post).set({
                    UID: props.location.state.post.UID,
                    id_post: id_post,
                    liked: false,
                })
                .then(() => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Error adding comment: ", error);
                });
            }
        })
        firebase.firestore().collection('posts').doc(id_post)
        .get()
        .then((doc) => {
            if (doc.exists) {
                setLikes(doc.data().likes);
            } else {
                console.log("No such document!");
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }
    const handleLikes = () => {
        if (user) {
            let addLike = 0;
            let isLiked = false;
            if (liked) {
                addLike = likes - 1;
                isLiked = false;
            } else {
                addLike = likes + 1;
                isLiked = true;
            }
            firebase.firestore().collection("posts").doc(id_post).update({
                likes: addLike,
            })
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
            firebase.firestore().collection("likes").doc(user.email+id_post).update({
                liked: isLiked,
            })
            .then(() => {
                setLiked(isLiked);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        }
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
        countLikes();
        commentsList();
    }, []);
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
                            <button className="btn btn-outline-danger btn-posts" onClick={deletePost}>Delete</button>
                        </div>
                        :
                        null
                    }
                    <div className="post-title">
                        <h3>{props.location.state.post.title}</h3>
                        {liked ?
                            <button className="like-button" onClick={handleLikes}>{likes} <FaThumbsUp fill="#33cc33" stroke="#33cc33" viewBox="0 0 512 700" height="2em" /></button>
                            :
                            <button className="like-button" onClick={handleLikes}>{likes} <FaThumbsDown fill="#ff0000" stroke="#ff0000" viewBox="0 0 512 500" height="2em" /></button>
                        }
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: props.location.state.post.description }}></p>
                    {props.location.state.post.image_urls.map((image_url, i) => (
                        <img
                        key={i}
                        style={{ width: "500px" }}
                        src={ image_url || "http://via.placeholder.com/300" }
                        alt="firebase"
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
                {user ?
                    <Comments user = { user } id_post = { id_post } username = { username } imageUrl = { imageUrl } comments = { comments } />
                    :
                    null
                }
            </div>
        </div>
    );
};

export default Post;