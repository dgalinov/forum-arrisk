import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const DisplayComment = () => {
    const [comments, setComments] = useState([]);
    const componentDidMount = () =>{
        firebase.firestore().collection('comments').get().then( snapshot => {
            const dataSnapshot = [];
            snapshot.forEach( doc => {
                dataSnapshot.push({...doc.data(), id_comment: doc.id });
                console.log(dataSnapshot);
            })
            setComments(dataSnapshot);
        }).catch( error => console.log(error));
    }
    useEffect(() => {
        componentDidMount();
    }, []);
    const num = 1;
    return (
        <div>
            {
                comments && comments.map( comment => {
                    return(
                        <div className="commented-section mt-2" key={comment.id_comment}>
                            <div className="d-flex flex-row align-items-center commented-user">
                                <h5 className="mr-2">{comment.username}</h5><span className="dot mb-1"></span><span className="mb-1 ml-2">{comment.created_at}</span>
                            </div>
                            <div className="comment-text-sm"><span>{comment.content}</span></div>
                            <div className="reply-section">
                                <div className="d-flex flex-row align-items-center voting-icons">
                                    <h6 className="ml-2 mt-1">Reply</h6>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default DisplayComment;