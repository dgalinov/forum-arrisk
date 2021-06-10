import React from 'react';

const CommentForm = (props) => {
    const {
        imageUrl,
        setContent,
        content,
        onSubmit
    } = props;
    return (
        <div className="d-flex flex-row add-comment-section mt-4 mb-4">
            <img className="img-fluid img-responsive rounded-circle mr-2" src={ imageUrl || null } width="29" />
            <input type="text" className="form-control mr-3" placeholder="Add comment" autoFocus required value={content} onChange={(e) => setContent(e.target.value)} />
            <button className="btn btn-warning" type="button" onClick={onSubmit}>Comment</button>
        </div>
    );
};

export default CommentForm;