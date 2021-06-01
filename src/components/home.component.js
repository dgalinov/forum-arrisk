import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { FaThumbsUp } from "react-icons/fa";
import { Link } from 'react-router-dom';

const HomePage = (props) => {
    const {
        clickedUser
    } = props;
    const [username, setUsername] = useState('');
    const [url, setUrl] = useState('');
    const [posts, setPosts] = useState([]);
    const fetchPosts = async() => {
        const response = firebase.firestore().collection('posts');
        const data = await response.get();
        const postData = [];
        data.docs.forEach((doc)=>{
            postData.push({...doc.data(), id: doc.id });
            setPosts(postData);
        });
        
    }
    useEffect(() => {
        fetchPosts();
        
    }, []);
    return (
        <div className="container">
            <div className="p-4 p-md-5 mb-4 text-white rounded bg-orange">
                <div className="col-md-6 px-0 text-carrousel">
                    <h1 className="display-2 fst-italic">Arrisk APK</h1>
                    <p className="lead my-3">Fight your way through an awesome adventure 2D platformer with hundreds of different enemies and maps.</p>
                    <p className="lead my-3">To save the world of Arrisk, you will have to travel through different levels, saving civilians and fighting with whoever stands in your way.</p>
                    <p className="lead mb-0"><button className="btn btn-warning" >Download for free!</button></p>
                </div>
            </div>
            <div className="panel">
                <div className="panel-content panel-bio">
                    <h1>Latest Posts</h1>
                    {
                        posts && posts.map(post=>{
                            return(
                                <div className="panel-content panel-activity" key={post.id}>
                                    <ul className="panel-activity__list">
                                        <li>
                                            <i className="activity__list__icon fa fa-question-circle-o"></i>
                                            <div className="activity__list__header">
                                                <img src={post.url} alt="profile_pic" />
                                                <a href="#"><Link to={{
                                                    pathname: `/preview-profile`,
                                                    query:{thing: post.email}
                                                }} >{post.username}</Link></a> Posted: <a href="#" dangerouslySetInnerHTML={{ __html: post.title }}></a>
                                            </div>
                                            <div className="activity__list__footer">
                                                <p> <FaThumbsUp /> {post.likes}</p>
                                                <span> <i className="fa fa-clock"></i>{post.updated_at}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/* <div className="panel">
                <div className="panel-content panel-bio">
                    <h1>Top Posts with Most Likes</h1>
                </div>
            </div> */}
        </div>
    );
}

export default HomePage;
