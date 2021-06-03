import './App.css';
import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import firebase from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/login.component';
import HomePage from './components/home.component';
import Profile from './components/profile.component';
import PreviewProfile from './components/preview-profile.component';
import Footer from './components/footer.component';
import AddPost from './components/add-post.component';
import PostList from './components/post-list.component';
import UpdateProfile from './components/update-profile.component';
import Post from './components/post.component';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

const App = () => {
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [bio, setBio] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const today = new Date();
  const date = today.getFullYear() + '-' + ( today.getMonth() + 1 ) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;
  const history = useHistory();
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
      history.push("/home");
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
      });
      handleProfile();
      history.push("/home");
  };
  const handleProfile = () => {
    firebase.firestore().collection("users").add({
        UID: email,
        username: username,
        BIO: "",
        image_url: 'https://firebasestorage.googleapis.com/v0/b/arrisk-cf965.appspot.com/o/images%2Fdefault.jpg?alt=media&token=6f36966a-3ef9-4a38-8274-dbc88eb23707',
        created_at: dateTime,
        updated_at: dateTime,
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        setUsernameError(error);
        console.error("Error adding document: ", error);
    });
  }
  const setProfile = () => {
    if (user.email !== undefined || user.email != null) {
      firebase.firestore().collection("users").where("UID", "==", user.email)
      .get()
      .then(snap => {
          snap.forEach(doc => {
              setUsername(doc.data().username);
              setId(doc.id);
              setBio(doc.data().BIO);
              setImageUrl(doc.data().image_url);
          });
      });
    }
  }
  const handleLogout = () => {
    firebase.auth().signOut();
    setUser('');
    history.push("/home");
  };
  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        clearInputs();
        setUser(user);
        setProfile();
      } else {
        setUser('');
      }
    })
  };
  useEffect(() => {
    authListener();
  });
  return (
    <div className="App">
      <Navbar bg="orange" variant="dark">
        <Navbar.Brand href="/home">Arrisk</Navbar.Brand>
        <Nav className="mr-auto nav_bar_wrapper">
        {user ?
          <>
          <Link to={"/post-list"} className="nav-link">
          all posts
          </Link>
          <Link to={"/add-post"} className="nav-link">
          create post
          </Link>
          </>
        :
        null
        }
        </Nav>
        {user ?
          <Nav>
            <NavDropdown title={username}>
              <NavDropdown.Item>
                <Link to={"/profile"} className="nav-dropdown">
                Profile
                </Link>
              </NavDropdown.Item>
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
      <div className="container mt-3 container-sama">
        {user ? (
          <Switch>
            <Route exact path={["/", "/home"]} render={(props) => (
              <HomePage {...props} />
            )} />
            <Route path="/profile_update" render={(props) => (
              <UpdateProfile {...props} username = { username } bio = { bio } id = { id } />
            )} />
            <Route path="/profile" render={(props) => (
              <Profile {...props} user = { user } username = { username } bio = { bio } imageUrl = { imageUrl } />
            )} />
            <Route exact path="/add-post" render={(props) => (
              <AddPost {...props} user = { user } username = { username } />
            )} />
            <Route exact path="/post-list" render={(props) => (
              <PostList {...props} user = { user } />
            )} />
            <Route exact path="/preview-profile" render={(props) => (
              <PreviewProfile {...props} />
            )} />
            <Route exact path="/post" render={(props) => (
              <Post {...props} />
            )} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path={["/", "/home"]} render={(props) => (
              <HomePage {...props} />
            )} />
            <Route path="/login" render={() => (
              <Login 
              username = { username }
              setUsername = { setUsername }
              email = { email } 
              setEmail = { setEmail } 
              password = { password }
              setPassword = { setPassword } 
              handleLogin = { handleLogin } 
              handleSignup = { handleSignup } 
              hasAccount = { hasAccount } 
              setHasAccount = { setHasAccount }
              usernameError = { usernameError }
              emailError = { emailError }
              passwordError = { passwordError }/>
            )} />
          </Switch>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
