import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaUserEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import firebase from '../firebase';

const PreviewProfile = (props) => {
    const [profileData, setProfileData] = useState([]);
    const [totalLikes, setTotalLikes] = useState('');
    const [postData, setPostData] = useState([]);
    const fetchProfile = () => {
        let likes = 0;
        firebase.firestore().collection('users')
        .where("UID", "==", props.location.state.post.UID)
        .get()
        .then((querySnapshot) => {
            const dataSnapshot = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                dataSnapshot.push({...doc.data(), id: doc.id});
                likes = likes + doc.data().likes;
            });
            setProfileData(dataSnapshot[0]);
            setTotalLikes(likes);
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }
    const fetchPosts = async() => {
        const response = firebase.firestore().collection('posts');
        const data = await response.where('UID', '==', props.location.state.post.UID).get();
        const profileData = [];
        data.docs.forEach((doc)=>{
            profileData.push({...doc.data(), id: doc.id });
            setPostData(profileData);
        });
    }
    useEffect(() => {
        fetchProfile();
        fetchPosts();
    }, []);
    return (
        <div className="container">
            <div className="col-lg-8">
                <div className="panel profile-cover">
                    <div className="profile-cover__img">
                        <img height="120px" src={profileData.image_url} alt="315x315" />
                        <h3 className="h3">{profileData.username}</h3>
                    </div>
                    <div className="profile-cover__action bg--img" data-overlay="0.3">
                        <br />
                        <br />
                        <br />
                    </div>
                    <div className="profile-cover__info">
                        <ul className="nav">
                            <li><strong>{postData.length}</strong>Posts</li>
                            <li><strong>{totalLikes}</strong>Likes</li>
                        </ul>
                    </div>
                </div>
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">Bio</h3>
                    </div>
                    <div className="panel-content panel-activity panel-bio">
                        {profileData.BIO == "" ? (
                            <>
                                There is nothing written in here
                            </>
                        ) : (
                            profileData.BIO
                        )
                            
                        }
                    </div>
                </div>
                <div className="panel">
                    <div className="panel-content panel-bio">
                        <h1>Posts</h1>
                        {
                            postData && postData.map(eachPost=>{
                                return(
                                    <div className="panel-content panel-activity" key={eachPost.id}>
                                        <ul className="panel-activity__list">
                                            <li>
                                                <i className="activity__list__icon fa fa-question-circle-o"></i>
                                                <div className="activity__list__header">
                                                    <a href="#"><Link to={{ pathname: `/preview-profile`, state:{post: eachPost } }} >{eachPost.username}</Link></a> Posted: <a href="#" dangerouslySetInnerHTML={{ __html: eachPost.title }}></a>
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

export default PreviewProfile;