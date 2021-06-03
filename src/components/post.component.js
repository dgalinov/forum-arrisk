import React from 'react';

const PostList = (props) => {
    console.log('About', props.location.state.id);
    return (
        <div className="container">
            <div className="col-lg-8">
                <div className="panel panel-post">
                    <h3 className="h3-post" >{props.location.state.id.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: props.location.state.id.description }}></p>
                    {/* {props.location.state.id.image_url.map((imageUrl, i) => (
                                <img
                                key={i}
                                style={{ width: "500px" }}
                                src={imageUrl || "http://via.placeholder.com/300"}
                                alt="firebase-image"
                                />
                            ))} */}
                    <p></p>
                </div>
                <div className="panel panel-post">
                    <textarea></textarea>
                    <button>send</button>
                </div>
            </div>
        </div>
    );
};

export default PostList;