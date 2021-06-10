import React, { useState } from 'react';
import firebase from '../firebase';
import { FaSave, FaRegTimesCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const PostUpdate = (props) => {
    const {
        username,
        bio,
        id
    } = props;
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    // const [image, setImage] = useState(null);
    // const [url, setUrl] = useState('');
    const handleChange = (event) => {
        if (event.target.files[0]) {
            const image = event.target.files[0];
            setImage(image);
            console.log(image.name);
        }
    }
    const today = new Date();
    const date = today.getFullYear() + '-' + ( today.getMonth() + 1 ) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    const handleUpload = () => {
        const uploadTask = firebase.storage().ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot) => {}, 
        (error) => {
            console.log(error);
        }, 
        () => {
            firebase.storage().ref('images').child(image.name).getDownloadURL().then(url => {
                console.log(url);
                setUrl(url);
                firebase.firestore().collection("users").doc(id).update({
                    username: newName,
                    updated_at: dateTime,
                    BIO: newBio,
                    image_url: url
                }).then(() => {
                    console.log("Document successfully updated!");
                    window.location.reload();
                }).catch((error) => {
                    console.error("Error updating document: ", error);
                });
            });
        });
    }
    return (
        <div className="container">
            <div className="col-lg-8">
                <div className="panel profile-cover">
                    <div className="profile-cover__img">
                        <img src={url || 'http://via.placeholder.com/315x315'} alt="Uploaded images 315x315" height="120" />
                        <input type="file" onChange={handleChange}/>
                        <input type="text" id="username" className="form-control" autoFocus required placeholder={username} onChange={(e) => setNewName(e.target.value)} />
                    </div>
                    <div className="profile-cover__action bg--img" data-overlay="0.3">
                        <button className="btn btn-rounded btn-warning">
                            <Link to={"/profile"} className="nav-link">
                            <span><FaRegTimesCircle /> Cancel</span>
                            </Link>
                        </button>
                        <button className="btn btn-rounded btn-warning" onClick={handleUpload}>
                            <Link to={"/profile"} className="nav-link">
                            <span><FaSave /> Save</span>
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
                        <textarea type="text" id="bio" className="form-control" autoFocus required placeholder={bio} onChange={(e) => setNewBio(e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostUpdate;