import React from 'react';
import Comment from './comment.component';

const PostList = (props) => {
    const {
        user,
        username,
        imageUrl
    } = props;
    const id_post = props.location.state.post.id_post;
    console.log('About', props.location.state);
    return (
        <div className="container">
            <div className="col-lg-8">
                <div className="panel panel-post">
                    <h3 className="h3-post" >{props.location.state.post.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: props.location.state.post.description }}></p>
                    {props.location.state.post.image_urls.map((image_url, i) => (
                        <img
                        key={i}
                        style={{ width: "500px" }}
                        src={image_url || "http://via.placeholder.com/300"}
                        alt="firebase-image"
                        />
                    ))}
                    <p></p>
                </div>
                <Comment user = { user } id_post = { id_post } username = { username } imageUrl = { imageUrl } />
            </div>
        </div>
    );
};

export default PostList;