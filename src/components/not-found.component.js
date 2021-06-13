import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>Oops!</h1>
                        <h2>404 Not Found</h2>
                        <div className="error-details">Sorry, an error has occured, Requested page not found!</div>
                        <div className="error-actions">
                            <button class="btn btn-outline-warning btn-lg">
                                <Link to={"/home"} className="nav-link">
                                    <span className="glyphicon glyphicon-home"></span>
                                    Home
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;