import logo from './images/logo192.png';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import firebase from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddForum from './components/add-forum.component';
import ForumList from './components/forum-list.component';
import Login from './components/login.component';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

const App = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  console.log(user);
  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }
  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }
  const handleLogin = () => {
      clearErrors();
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
      switch(err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
              setEmailError(err.message);
              break;
          case 'auth/wrong-password':
              setPasswordError(err.message);
            break;
          default:
            break;
      }
      });
  };
  const handleSignup = () => {
      clearErrors();
      firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
      switch(err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          case 'auth/weak-password':
            setPasswordError(err.message);
            break;
          default:
            break;
      }
      })
  };
  const handleLogout = () => {
    firebase.auth().signOut();
  };
  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        clearInputs();
        console.log(user);
        setUser(user);
      } else {
        setUser('');
      }
    })
  };
  useEffect(() => {
    authListener();
  })
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Arrisk</Navbar.Brand>
        <Nav className="mr-auto nav_bar_wrapper">
        {user ?
          <>
          <Link to={"/forum"} className="nav-link">
          forum
          </Link>
          <Link to={"/add"} className="nav-link">
          add
          </Link>
          </>
        :
        null
        }
        </Nav>
        {user ?
          <Nav>
            <NavDropdown title='{user}'>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          : 
          <>
            <Link to={"/login"} className="nav-link" >
              Sign In
            </Link>
          </>
        }
      </Navbar>
      <div className="container mt-3">
        {user ? (
          <Switch>
            <Route exact path={["/", "/forum"]} component={ForumList} />
            <Route exact path="/add" component={AddForum} />
          </Switch>
        ) : (
          <Login 
          email={email} 
          setEmail={setEmail} 
          password={password}
          setPassword={setPassword} 
          handleLogin={handleLogin} 
          handleSignup={handleSignup} 
          hasAccount={hasAccount} 
          setHasAccount={setHasAccount} 
          emailError={emailError}
          passwordError={passwordError}/>
        )}
      </div>
    </div>
  );
}

export default App;
