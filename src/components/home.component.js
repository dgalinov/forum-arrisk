import React, { Component } from 'react';
import firebase from '../firebase';

export default class Home extends Component {
    logout() {
        firebase.auth().signOut();
    }
    render() {
        return (
            <div>
                <h3 className="h3">Welcome to the front page</h3>
                <button className="btn btn-primary" onClick={this.logout}>Logout</button>
            </div>
        )
    }
}