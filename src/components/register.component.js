import React, { Component } from "react";
import firebase from "../firebase";

export default class Register extends Component {
    user = React.createRef();
    password = React.createRef();
    constructor(props) {
        super(props);
        this.signup = this.signup.bind(this);
    }
    signup(e) {
        e.preventDefault();
        var myuser = this.user.current.value;
        var mypassword = this.password.current.value;
        firebase
        .auth()
        .createUserWithEmailAndPassword(myuser, mypassword)
        .then(() => {
            console.log('SUCCESS');
        })
        .catch((ERROR) => {
            console.log('ERROR', ERROR);
        });
    }
    render() {
        return (
            <div className="content">
                <form>
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail">Email</label>
                        <div class="col-sm-10">
                            <input type="email" name="email" className="form-control" id="staticEmail" ref={this.user} ></input>
                        </div>
                        
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputPassword">Password</label>
                        <div class="col-sm-10">
                            <input type="password" name="password" className="form-control" id="inputPassword" ref={this.password} ></input>
                        </div>
                    </div>
                    <button class="btn btn-primary mb-3" onClick={this.signup}>Register</button>
                </form>
            </div>
        );
    }
}