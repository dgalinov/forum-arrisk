import React, { useState } from 'react';
import firebase from '../firebase';

const CommentForm = (props) => {
    const {
        imageUrl,
        user,
        username,
        id_post,
        parent_id
    } = props;
    const today = new Date();
    const date = today.getFullYear() + '-' + ( today.getMonth() + 1 ) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    const [content, setContent] = useState('');
    console.log(imageUrl);
    const handleComment = () => {
        if (parent_id == null) {
            firebase.firestore().collection("comments").add({
                UID: user.email,
                username: username,
                imageUrl: imageUrl,
                id_post: id_post,
                content: content,
                parent_id: null,
                created_at: dateTime,
            })
            .then((docRef) => {
                console.log("Comment written with ID: ", docRef.id);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error adding comment: ", error);
            });
        } else {
            firebase.firestore().collection("comments").add({
                UID: user.email,
                username: username,
                imageUrl: imageUrl,
                id_post: id_post,
                content: content,
                parent_id: parent_id,
                created_at: dateTime,
            })
            .then((docRef) => {
                console.log("Comment written with ID: ", docRef.id);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error adding comment: ", error);
            });
        }
        
    }
    return (
        <div className="d-flex flex-row add-comment-section mt-4 mb-4">
            <img className="img-fluid img-responsive rounded-circle mr-2" src={ imageUrl } width="29" />
            <input type="text" className="form-control mr-3" placeholder="Add comment" autoFocus required value={content} onChange={(e) => setContent(e.target.value)} />
            <button className="btn btn-warning" type="button" onClick={handleComment} >Comment</button>
        </div>
    );
};

export default CommentForm;