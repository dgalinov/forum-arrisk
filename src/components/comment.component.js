import React, { useState } from 'react';
import firebase from '../firebase';
import DisplayComment from './display-comment.component';

const Comment = (props) => {
    const {
        user,
        username,
        imageUrl,
        id_post
    } = props;
    const [content, setContent] = useState('');
    const today = new Date();
    const date = today.getFullYear() + '-' + ( today.getMonth() + 1 ) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    const onSubmit = () => {
        firebase.firestore().collection("comments").where("id_post", "==", id_post).add({
            UID: user.email,
            username: username,
            id_post: id_post,
            content: content,
            created_at: dateTime,
            updated_at: dateTime,
        })
        .then((docRef) => {
            console.log("Comment written with ID: ", docRef.id);
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error adding comment: ", error);
        });
    };
    return (
        <div className="panel panel-post">
            <div className="coment-bottom p-2 px-4">
                <div className="d-flex flex-row add-comment-section mt-4 mb-4">
                    <img className="img-fluid img-responsive rounded-circle mr-2" src={ imageUrl || null } width="29" />
                    <input type="text" className="form-control mr-3" placeholder="Add comment" autoFocus required value={content} onChange={(e) => setContent(e.target.value)} />
                    <button className="btn btn-warning" type="button" onClick={onSubmit}>Comment</button>
                </div>
                <DisplayComment />
            </div>
            {/* <textarea className="form-control textarea-comment" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <button className="btn btn-warning" onClick={onSubmit}>send</button> */}
            
        </div>
    );
};

export default Comment;