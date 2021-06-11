import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaUserEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import firebase from '../firebase';

const Profile = (props) => {
    const {
        username,
        user,
        bio,
        imageUrl
    } = props;
    const [url, setUrl] = useState('');
    const [posts, setPosts] = useState([]);
    const getProfilePosts = async() => {
        const response = firebase.firestore().collection('posts');
        const data = await response.where('UID', '==', user.email).get();
        const postData = [];
        data.docs.forEach((doc)=>{
            postData.push({...doc.data(), id: doc.id });
            setPosts(postData);
        });
    }
    useEffect(() => {
        getProfilePosts();
    }, []);
    return (
        <div className="container">
            <div className="col-lg-8">
                <div className="panel profile-cover">
                    <div className="profile-cover__img">
                        <img height="120px" src={imageUrl} alt="315x315" />
                        <h3 className="h3">{username}</h3>
                    </div>
                    <div className="profile-cover__action bg--img" data-overlay="0.3">
                        <button className="btn btn-rounded btn-warning">
                            <Link to={"/profile_update"} className="nav-link">
                            <span><FaUserEdit /> Edit</span>
                            </Link>
                        </button>
                        
                    </div>
                    <div className="profile-cover__info">
                        <ul className="nav">
                            <li><strong>0</strong>Posts</li>
                            <li><strong>0</strong>Likes</li>
                        </ul>
                    </div>
                </div>
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">Bio</h3>
                    </div>
                    <div className="panel-content panel-activity panel-bio">
                        {bio === "" ? (
                            <>
                                There is nothing written in here
                            </>
                        ) : (
                            bio
                        )}
                    </div>
                </div>
                <div className="panel">
                    <div className="panel-content panel-bio">
                        <h1>Posts</h1>
                        {
                            posts && posts.map(eachPost=>{
                                return(
                                    <div className="panel-content panel-activity" key={eachPost.id}>
                                        <ul className="panel-activity__list">
                                            <li>
                                                <i className="activity__list__icon fa fa-question-circle-o"></i>
                                                <div className="activity__list__header">
                                                    <a href="#"><Link to={{ pathname: `/preview-profile`, state:{post: eachPost } }} >{eachPost.username}</Link></a> Posted: <Link  to={{ pathname: `/post`, state:{post: eachPost } }}><a href="#" dangerouslySetInnerHTML={{ __html: eachPost.title }}></a></Link>
                                                </div>
                                                <div className="activity__list__footer">
                                                    <p> <FaThumbsUp /> {eachPost.likes}</p>
                                                    <span> <i className="fa fa-clock"></i>{eachPost.updated_at}</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;