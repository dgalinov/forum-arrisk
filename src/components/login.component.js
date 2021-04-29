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
    } = props;
    return (
        <div class="container">
            <div class="col-lg-8">
                <div class="panel">
                    <div class="panel-content panel-bio">
                        {hasAccount ? (
                            <>
                                <h1>Register</h1>
                                <div className="mb-3">
                                    <label for="username" class="form-label">Name</label>
                                    <input type="text" id="username" className="form-control" placeholder="name" autoFocus required value={username} onChange={(e) => setUsername(e.target.value)} />
                                    <p className="errorMsg">{usernameError}</p>
                                </div>
                                <div className="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="text" id="email" className="form-control" placeholder="email@example.com" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <p className="errorMsg">{emailError}</p>
                                </div>
                                <div className="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" id="password" class="form-control" placeholder="********" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <p className="errorMsg">{passwordError}</p>
                                </div>
                                <div className="btnContainer">
                                    <button class="btn btn-warning" onClick={handleSignup}>Sign up</button>
                                    <p>Have an account ? <span class="btn btn-outline-warning" onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                                </div>
                            </>
                        ) : (
                            <>
                                <h1>Login</h1>
                                <div className="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="text" id="email" className="form-control" placeholder="email@example.com" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <p className="errorMsg">{emailError}</p>
                                </div>
                                <div className="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" id="password" class="form-control" placeholder="********" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <p className="errorMsg">{passwordError}</p>
                                </div>
                                <div className="btnContainer">
                                    <button class="btn btn-warning" onClick={handleLogin}>Sign in</button>
                                    <p>Don't have an account ? <span class="btn btn-outline-warning" onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
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