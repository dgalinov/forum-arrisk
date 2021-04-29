import React from "react";
import { FaThumbsUp } from "react-icons/fa";

const Profile = (props) => {
    // const {
    //     username,
    //     usernameError,
    //     email,
    //     setUsername,
    //     setEmail,
    //     password,
    //     setPassword,
    //     handleLogin,
    //     handleSignup,
    //     hasAccount,
    //     setHasAccount,
    //     emailError,
    //     passwordError,
    // } = props;
    return (
        <div class="container">
            <div class="col-lg-8">
                <div class="panel profile-cover">
                    <div class="profile-cover__img">
                        <img height="120px" src="https://static.wikia.nocookie.net/owobot/images/5/5d/7f7a07bfad0ad6a2faaaccd9421e5392.png/revision/latest?cb=20191129013231" alt="315x315" />
                        <h3 class="h3">Profile Name</h3>
                    </div>
                    <div class="profile-cover__action bg--img" data-overlay="0.3">
                        <button class="btn btn-rounded btn-info">
                            <i class="fa fa-plus"></i>
                            <span>Follow</span>
                        </button>
                    </div>
                    <div class="profile-cover__info">
                        <ul class="nav">
                            <li><strong>0</strong>Posts</li>
                            <li><strong>0</strong>Likes</li>
                        </ul>
                    </div>
                </div>
                <div class="panel">
                    <div class="panel-heading">
                        <h3 class="panel-title">Activity</h3>
                    </div>
                    <div class="panel-content panel-activity">
                        <ul class="panel-activity__list">
                            <li>
                                <i class="activity__list__icon fa fa-question-circle-o"></i>
                                <div class="activity__list__header">
                                    <img src="#" alt="profile_pic" />
                                    <a href="#">Profile Name</a> Posted: <a href="#">Title of the Post</a>
                                </div>
                                <div class="activity__list__footer">
                                    <p href="#"> <FaThumbsUp /> 0</p>
                                    <span> <i class="fa fa-clock"></i>Published date</span>
                                </div>
                            </li>
                            <li>
                                <i class="activity__list__icon fa fa-question-circle-o"></i>
                                <div class="activity__list__header">
                                    <img src="#" alt="profile_pic" />
                                    <a href="#">Profile Name</a> Posted: <a href="#">Title of the Post</a>
                                </div>
                                <div class="activity__list__footer">
                                    <p href="#"> <FaThumbsUp /> 0</p>
                                    <span> <i class="fa fa-clock"></i>Published date</span>
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