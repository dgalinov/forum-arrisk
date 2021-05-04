import React, { useState } from 'react';
import { FaThumbsUp, FaUserEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Profile = (props) => {
    const {
        user,
        username,
        bio,
        imageUrl
    } = props;
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
                        {bio == "" ? (
                            <>
                                There is nothing written in here
                            </>
                        ) : (
                            bio
                        )
                            
                        }
                    </div>
                </div>
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">Activity</h3>
                    </div>
                    <div className="panel-content panel-activity">
                        <ul className="panel-activity__list">
                            <li>
                                <i className="activity__list__icon fa fa-question-circle-o"></i>
                                <div className="activity__list__header">
                                    <img src="#" alt="profile_pic" />
                                    <a href="#">Profile Name</a> Posted: <a href="#">Title of the Post</a>
                                </div>
                                <div className="activity__list__footer">
                                    <p> <FaThumbsUp /> 0</p>
                                    <span> <i className="fa fa-clock"></i>Published date</span>
                                </div>
                            </li>
                            <li>
                                <i className="activity__list__icon fa fa-question-circle-o"></i>
                                <div className="activity__list__header">
                                    <img src="#" alt="profile_pic" />
                                    <a href="">Profile Name</a> Posted: <a href="#">Title of the Post</a>
                                </div>
                                <div className="activity__list__footer">
                                    <p> <FaThumbsUp /> 0</p>
                                    <span> <i className="fa fa-clock"></i>Published date</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;