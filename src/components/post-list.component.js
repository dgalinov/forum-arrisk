import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const componentDidMount = () =>{
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
    const num = 1;
    return (
        <div className="main-container">
            <div className="card-container">
                <div className="panel panel-search">
                    <input type="text" className="form-control" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}} />
                </div>
                {
                    posts && posts.filter( (eachPost) => {
                        if (searchTerm == "") {
                            return eachPost
                        } else if (eachPost.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return eachPost
                        }
                    }).map( eachPost => {
                        return(
                            <div className="card_post card-2" key={eachPost.id}>
                                <h2 className="card__title">{eachPost.title}</h2>
                                <p className="card__apply"><Link to={{ pathname: `/post`, state:{id: eachPost } }} >Open Post <FaArrowRight /></Link></p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default PostList;