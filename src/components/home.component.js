import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { FaThumbsUp } from "react-icons/fa";
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const fetchPosts = () => {
        firebase.firestore().collection('posts').limit(5).get().then( snapshot => {
            const dataSnapshot = [];
            snapshot.forEach( doc => {
                dataSnapshot.push({...doc.data(), id_post: doc.id });
            });
            setPosts(dataSnapshot);
        }).catch( error => console.log(error));
    }
    useEffect(() => {
        fetchPosts();
    });
    return (
        <div className="container">
            <div className="p-4 p-md-5 mb-4 text-white rounded bg-orange">
                <div className="col-md-6 px-0 text-carrousel">
                    <h1 className="display-2 fst-italic">Arrisk APK</h1>
                    <p className="lead my-3">Fight your way through an awesome adventure 2D platformer with hundreds of different enemies and maps.</p>
                    <p className="lead my-3">To save the world of Arrisk, you will have to travel through different levels, saving civilians and fighting with whoever stands in your way.</p>
                    <p className="lead mb-0"><a href="https://firebasestorage.googleapis.com/v0/b/arrisk-cf965.appspot.com/o/apk%2Farrisk.apk?alt=media&token=0639021c-5c3c-4dc2-9cbf-f3274cb3927f" download="https://firebasestorage.googleapis.com/v0/b/arrisk-cf965.appspot.com/o/apk%2Farrisk.apk?alt=media&token=0639021c-5c3c-4dc2-9cbf-f3274cb3927f" className="btn btn-warning" >Download for free!</a></p>
                </div>
            </div>
            <div className="panel">
                <div className="panel-content panel-bio">
                    <h1>Latest Posts</h1>
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
    );
}

export default HomePage;
