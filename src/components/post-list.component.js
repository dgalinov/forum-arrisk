import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [orderBy, setOrderBy] = useState('created_at');
    const [order, setOrder] = useState('desc');
    const displayPostList = () =>{
        firebase.firestore().collection('posts').orderBy(orderBy, order).get().then( snapshot => {
            const dataSnapshot = [];
            snapshot.forEach( doc => {
                dataSnapshot.push({...doc.data(), id_post: doc.id });
                console.log("Entra");
            })
            setPosts(dataSnapshot);
        }).catch( error => console.log(error));
    }
    const cleanFilter = () => {
        setOrderBy('created_at');
        setOrder('desc');
    }
    useEffect(() => {
        displayPostList();
        cleanFilter();
    }, [orderBy, order]);
    return (
        <div className="main-container">
            <div className="card-container">
                <div className="panel-search">
                    <div className="post-search-filter">
                        <input type="text" className="form-control" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}} />
                    </div>
                    <div className="post-order-radio" >
                        <label className="l-radio">
                            <input type="radio" id="y-option" name="orderbyRadio" defaultChecked onClick={() => {cleanFilter()}} />
                            <span>None</span>
                        </label>
                        <label className="l-radio">
                            <input type="radio" id="f-option" name="orderbyRadio" onClick={() => {setOrderBy('title');}} />
                            <span>Title</span>
                        </label>
                        <label className="l-radio">
                            <input type="radio" id="r-option" name="orderbyRadio" onClick={() => {setOrderBy('date');}} />
                            <span>Date</span>
                        </label>
                    </div>
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
                                <p className="card__apply"><Link to={{ pathname: `/post`, state:{post: eachPost } }} >Open Post <FaArrowRight /></Link></p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default PostList;