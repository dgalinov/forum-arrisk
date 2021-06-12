import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {


    return (
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="error-template">
                        <h1>Oops!</h1>
                        <h2>404 Not Found</h2>
                        <div class="error-details">Sorry, an error has occured, Requested page not found!</div>
                        <div class="error-actions">
                            <button class="btn btn-outline-warning btn-lg">
                                <Link to={"/home"} className="nav-link">
                                    <span class="glyphicon glyphicon-home"></span>
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