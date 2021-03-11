import React from "react";
import { FaGoogle } from 'react-icons/fa';

const Login = (props) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError,
    } = props;
    // const email = sessionStorage.getItem('email');
    // const setEmail = sessionStorage.getItem('setEmail');
    // const password = sessionStorage.getItem('password');
    // const setPassword = sessionStorage.getItem('setPassword');
    // const handleLogin = sessionStorage.getItem('handleLogin');
    // const handleSignup = sessionStorage.getItem('handleSignup');
    // const hasAccount = sessionStorage.getItem('hasAccount');
    // const setHasAccount = sessionStorage.getItem('setHasAccount');
    // const emailError = sessionStorage.getItem('emailError');
    // const passwordError = sessionStorage.getItem('passwordError');
    return (
        <div className="container">
            <div class="card">
                <article class="card-body">
                    {hasAccount ? (
                        <>
                            <a onClick={() => setHasAccount(!hasAccount)} class="float-right btn btn-outline-primary">Sign up</a>
                        </>
                    ) : (
                        <>
                            <a onClick={() => setHasAccount(!hasAccount)} class="float-right btn btn-outline-primary">Sign in</a>
                        </>
                    )}
                    <h4 class="card-title mb-4 mt-1">Sign in</h4>
                    <p>
                        <a href="" class="btn btn-block btn-outline-danger"><FaGoogle /> Login via Google</a>
                    </p>
                    <hr />
                    <form>
                        <div class="form-group">
                            <input name="email" class="form-control" placeholder="Email" type="email" id="staticEmail" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <p className="errorMsg">{emailError}</p>
                        </div>
                        <div class="form-group">
                            <input class="form-control" placeholder="Password" type="password" name="password" id="inputPassword" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <p className="errorMsg">{passwordError}</p>
                        </div>                                     
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                {hasAccount ? (
                                    <>
                                        {/* <button type="submit" class="btn btn-primary btn-block" onClick={this.login}> Login  </button> */}
                                        <button onClick={handleLogin} class="btn btn-primary btn-block" >Sign in</button>
                                        <p>Don't have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                                    </>
                                ) : (
                                    <>
                                        {/* <button type="submit" class="btn btn-primary btn-block" onClick={this.signup}> Sign up  </button> */}
                                        <button onClick={handleSignup} class="btn btn-primary btn-block" >Sign up</button>
                                        <p>Have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                                    </>
                                )}
                                </div>
                            </div>
                            <div class="col-md-6 text-right">
                                <a class="small" href="#">Forgot password?</a>
                            </div>                                            
                        </div>
                    </form>
                </article>
            </div>
        </div>
        // {/* <section className="login">
        // <div className="loginController">
        //     <label>Email</label>
        //     <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
        //     <p className="errorMsg">{emailError}</p>
        //     <label>Password</label>
        //     <input type="password" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} />
        //     <p className="errorMsg">{passwordError}</p>
        //     <div className="btnContainer">
        //         {hasAccount ? (
        //             <>
        //                 <button onClick={handleLogin}>Sign in</button>
        //                 <p>Don't have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
        //             </>
        //         ) : (
        //             <>
        //                 <button onClick={handleSignup}>Sign up</button>
        //                 <p>Have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
        //             </>
        //         )}
        //     </div>
        // </div>
        // </section> */}
    );
};

export default Login;

// const [hasAccount, setHasAccount] = useState(false);
// const [email, setEmail] = useState('');
// const [emailError, setEmailError] = useState('');
// const [password, setPassword] = useState('');
// const [passwordError, setPasswordError] = useState('');

// export default class Login extends Component {
//     user = React.createRef();
//     password = React.createRef();
//     constructor(props) {
//         super(props);
//         this.login = this.login.bind(this);
//         this.signup = this.signup.bind(this);
//     }
//     clearErrors() {
//         setEmailError('');
//         setPasswordError('');
//     }
//     login(e) {
//         e.preventDefault();
//         var myuser = this.user.current.value;
//         var mypassword = this.password.current.value;
//         firebase.auth().signInWithEmailAndPassword(myuser, mypassword)
//         .then(() => {
//             console.log('SUCCESS');
//         })
//         .catch((ERROR) => {
//             console.log('ERROR', ERROR);
//         });
//     }
//     signup(e) {
//         e.preventDefault();
//         var myuser = this.user.current.value;
//         var mypassword = this.password.current.value;
//         firebase
//         .auth()
//         .createUserWithEmailAndPassword(myuser, mypassword)
//         .then(() => {
//             console.log('SUCCESS');
//         })
//         .catch((ERROR) => {
//             console.log('ERROR', ERROR);
//         });
//     }
//     handleLogin() {
//         clearErrors();
//         firebase
//         .auth()
//         .signInWithEmailAndPassword(email, password)
//         .catch(err => {
//         switch(err.code) {
//             case 'auth/invalid-email':
//             case 'auth/user-disabled':
//             case 'auth/user-not-found':
//                 setEmailError(err.message);
//                 break;
//             case 'auth/wrong-password':
//                 setPasswordError(err.message);
//             break;
//         }
//         })
//     };
//     handleSignup() {
//         clearErrors();
//         firebase
//         .auth()
//         .createUserWithEmailAndPassword(email, password)
//         .catch(err => {
//         switch(err.code) {
//             case 'auth/email-already-in-use':
//             case 'auth/invalid-email':
//             setEmailError(err.message);
//             break;
//             case 'auth/weak-password':
//             setPasswordError(err.message);
//             break;
//         }
//         })
//     };
//     render() {
//         return (
//             <div className="container">
//                     <div class="card">
//                         <article class="card-body">
//                             <a href="" class="float-right btn btn-outline-primary">Sign up</a>
//                             <h4 class="card-title mb-4 mt-1">Sign in</h4>
//                             <p>
//                                 <a href="" class="btn btn-block btn-outline-danger"><FaGoogle /> Login via Google</a>
//                             </p>
//                             <hr />
//                             <form>
                                
//                                 <div class="form-group">
//                                     <input name="email" class="form-control" placeholder="Email" type="email" id="staticEmail" ref={this.user} />
//                                 </div>
//                                 <div class="form-group">
//                                     <input class="form-control" placeholder="Password" type="password" name="password" id="inputPassword" ref={this.password} />
//                                 </div>                                     
//                                 <div class="row">
//                                     <div class="col-md-6">
//                                         <div class="form-group">
//                                             {hasAccount ? (
//                                                 <>
//                                                     <button type="submit" class="btn btn-primary btn-block" onClick={this.login}> Login  </button>
//                                                     <button onClick={handleLogin}>Sign in</button>
//                                                     <p>Don't have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
//                                                 </>
//                                             ) : (
//                                                 <>
//                                                     <button type="submit" class="btn btn-primary btn-block" onClick={this.signup}> Sign up  </button>
//                                                     <button onClick={handleSignup}>Sign up</button>
//                                                     <p>Have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
//                                                 </>
//                                             )}
//                                         </div>
//                                     </div>
//                                     <div class="col-md-6 text-right">
//                                         <a class="small" href="#">Forgot password?</a>
//                                     </div>                                            
//                                 </div>
//                             </form>
//                         </article>
//                     </div>
//                     <div className="mb-3 row">
                        
//                         <div class="col-sm-10">
//                             <input type="email" name="email" className="form-control" id="staticEmail" ref={this.user} ></input>
//                         </div>
//                     </div>
//                     <div className="mb-3 row">
//                         <label htmlFor="inputPassword">Password</label>
//                         <div class="col-sm-10">
//                             <input type="password" name="password" className="form-control" id="inputPassword" ref={this.password} ></input>
//                         </div>
//                     </div>
//                     <button type="submit" class="btn btn-primary mb-3" onClick={this.login}>
//                         Login
//                     </button>
//             </div>
//         );
//     }
// }
