import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { FaArrowRight } from "react-icons/fa";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const postData = [];
    const componentDidMount = () =>{
        console.log('mounted');
        firebase.firestore().collection('posts').get().then( snapshot => {
            console.log(snapshot);
            const dataSnapshot = [];
            snapshot.forEach( doc => {
                const data = doc.data();
                dataSnapshot.push(data);
            })
            setPosts(dataSnapshot);
        }).catch( error => console.log(error));
    }
    useEffect(() => {
        componentDidMount();
    }, []);
    return (
        <div className="main-container">
            <div className="card-container">
                {
                    posts && posts.map( eachPost => {
                        return(
                            <div className="card_post card-2" key={eachPost.id}>
                                <h2 className="card__title">{eachPost.title}</h2>
                                <p className="card__apply"><a href="#">Open Post <FaArrowRight /></a></p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default PostList;