import React from 'react';
import PropTypes from "prop-types"
import Comment from './comment.component';
import CommentForm from './comment-form.component';

const Comments = (props) => {
    const {
        user,
        username,
        imageUrl,
        id_post,
        comments
    } = props;
    return (
        <div className="panel panel-post">
            <div className="coment-bottom p-2 px-4">
                <h3>Comment box</h3>
                <CommentForm user = { user } username = { username } imageUrl = { imageUrl } id_post = { id_post } />
                <div>
                    {comments.length > 0 &&
                        comments.map(comment => {
                            let child
                            if (comment.parent_id !== null) {
                                child = comment;
                            }
                            return (
                                <Comment
                                key = { comment.id }
                                child = { child }
                                user = { user }
                                id_post = { id_post }
                                comment = { comment } 
                                imageUrl = { imageUrl }
                                username = { username }/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default Comments;