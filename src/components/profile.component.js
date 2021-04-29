import React from 'react';
import firebase from '../firebase';
import { FaThumbsUp } from "react-icons/fa";

const Profile = (props) => {
    const {
        user
    } = props;
    // let data = '';
    firebase.firestore().collection("users").where("UID", "==", user.email)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data().username);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    console.log(props.user.email);
    return (
        <div className="container">
            <div className="col-lg-8">
                <div className="panel profile-cover">
                    <div className="profile-cover__img">
                        <img height="120px" src="https://static.wikia.nocookie.net/owobot/images/5/5d/7f7a07bfad0ad6a2faaaccd9421e5392.png/revision/latest?cb=20191129013231" alt="315x315" />
                        <h3 className="h3">Name</h3>
                    </div>
                    <div className="profile-cover__action bg--img" data-overlay="0.3">
                        <button className="btn btn-rounded btn-info">
                            <i className="fa fa-plus"></i>
                            <span>Follow</span>
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
                        I like anime and cry by myself ono
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
                                    <p href="#"> <FaThumbsUp /> 0</p>
                                    <span> <i className="fa fa-clock"></i>Published date</span>
                                </div>
                            </li>
                            <li>
                                <i className="activity__list__icon fa fa-question-circle-o"></i>
                                <div className="activity__list__header">
                                    <img src="#" alt="profile_pic" />
                                    <a href="#">Profile Name</a> Posted: <a href="#">Title of the Post</a>
                                </div>
                                <div className="activity__list__footer">
                                    <p href="#"> <FaThumbsUp /> 0</p>
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