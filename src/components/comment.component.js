import React, { useState } from "react"
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
                            <button className="btn btn-outline-warning" onClick={() => setShowReplyBox(true)}>
                                Reply
                            </button>
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
                        <button className="btn btn-outline-warning" onClick={() => setShowReplyBox(true)}>
                            Reply
                        </button>
                    )}
                    </CommentBox>
            )}
        </CommentBox>
    )
}

export default Comment;