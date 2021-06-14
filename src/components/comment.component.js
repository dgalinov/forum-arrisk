import React, { useState } from "react"
import firebase from '../firebase';
import CommentForm from "./comment-form.component"
import styled from "styled-components"

const CommentBox = styled.article`
    margin: 0 0 0 ${props => (props.child ? "2rem" : "0")};
`;

const SingleComment = ({ comment }) => (
    <div className="d-flex flex-row add-comment-section mt-4 mb-4">
        <img className="img-fluid img-responsive rounded-circle mr-2" src={ comment.imageUrl || null } width="17" />
        {comment.username+": "}
        {comment.content}
    </div>
)

const Comment = (props) => {
    const {
        child,
        comment,
        imageUrl,
        user,
        username,
        id_post
    } = props;
    const [showReplyBox, setShowReplyBox] = useState(false);
    const deleteComment = () => {
        firebase.firestore().collection("comments").where("parent_id", "==", comment.id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                firebase.firestore().collection("comments").doc(doc.data().id).delete();
            });
            firebase.firestore().collection("comments").doc(comment.id).delete()
            .then(() => {
                window.location.reload();
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }
    return (
        <CommentBox>
            {!child && (
                <CommentBox>
                    <SingleComment comment = { comment } />
                    <div>
                        {showReplyBox ? (
                            <div>
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => setShowReplyBox(false)}
                            >
                                Cancel Reply
                            </button>
                            <CommentForm user = { user } username = { username } imageUrl = { imageUrl } id_post = { id_post } parent_id={comment.id} />
                            </div>
                        ) : (
                            <div>
                                <button className="btn btn-outline-warning" onClick={() => setShowReplyBox(true)}>
                                    Reply
                                </button>
                                {user.email === comment.UID ?
                                    <button className="btn btn-outline-danger" onClick={() => deleteComment()}>Delete</button>
                                    :
                                    null
                                }
                            </div>
                        )}
                    </div>
                </CommentBox>
            )}
            {child && (
                <CommentBox child className="comment-reply">
                    <SingleComment comment = { child } />
                    {showReplyBox ? (
                        <div>
                        <button
                            className="btn btn-outline-danger"
                            onClick={() => setShowReplyBox(false)}
                        >
                            Cancel Reply
                        </button>
                        <CommentForm user = { user } username = { username } imageUrl = { imageUrl } id_post = { id_post } parent_id={comment.id} />
                        </div>
                    ) : (
                        <div>
                            <button className="btn btn-outline-warning" onClick={() => setShowReplyBox(true)}>
                                Reply
                            </button>
                            <button className="btn btn-outline-danger" onClick={() => deleteComment()}>Delete</button>
                        </div>
                    )}
                    </CommentBox>
            )}
        </CommentBox>
    )
}

export default Comment;