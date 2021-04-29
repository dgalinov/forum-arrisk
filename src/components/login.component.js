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
        <section className="login">
            <div className="loginController">
                <label>User Name</label>
                <input type="text" autoFocus required value={username} onChange={(e) => setUsername(e.target.value)} />
                <p className="errorMsg">{usernameError}</p>
                <label>Email</label>
                <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input type="password" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                            <button onClick={handleLogin}>Sign in</button>
                            <p>Don't have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                        </>
                    ) : (
                        <>
                            <button onClick={handleSignup}>Sign up</button>
                            <p>Have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Login;