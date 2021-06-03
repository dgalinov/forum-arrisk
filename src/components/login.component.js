import React from "react";

const Login = (props) => {
    const {
        username,
        usernameError,
        email,
        setUsername,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError,
        handleGoogleSign
    } = props;
    return (
        <div className="container">
            <div className="col-lg-8">
                <div className="panel">
                    <div className="panel-content panel-bio">
                        {hasAccount ? (
                            <>
                                <h1>Register</h1>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" id="username" className="form-control" placeholder="name" autoFocus required value={username} onChange={(e) => setUsername(e.target.value)} />
                                    <p className="errorMsg">{usernameError}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="text" id="email" className="form-control" placeholder="email@example.com" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <p className="errorMsg">{emailError}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" id="password" className="form-control" placeholder="********" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <p className="errorMsg">{passwordError}</p>
                                </div>
                                <div className="btnContainer">
                                    <button className="btn btn-warning" onClick={handleSignup}>Sign up</button>
                                    <p>Have an account ? <span className="btn btn-outline-warning" onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                                </div>
                            </>
                        ) : (
                            <>
                                <h1>Login</h1>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="text" id="email" className="form-control" placeholder="email@example.com" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <p className="errorMsg">{emailError}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" id="password" className="form-control" placeholder="********" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <p className="errorMsg">{passwordError}</p>
                                </div>
                                <div className="btnContainer">
                                    <button className="btn btn-warning" onClick={handleLogin}>Sign in</button>
                                    <p>Don't have an account ? <span className="btn btn-outline-warning" onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                                    <p><span className="btn btn-outline-danger" onClick={handleGoogleSign}>Sign in with Google</span></p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;