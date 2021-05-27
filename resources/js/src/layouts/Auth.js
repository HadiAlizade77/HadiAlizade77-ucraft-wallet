import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// components

import Navbar from 'components/Navbars/AuthNavbar.js';
import FooterSmall from 'components/Footers/FooterSmall.js';

// views

import Login from 'views/auth/Login.js';
import Register from 'views/auth/Register.js';
import Authentication from 'views/auth/Authenticate.js';
import VerifyEmail from 'views/auth/VerifyEmail.js';

export default function Auth({
    registerWithCredentials,
    callToVerifyEmail,
    loginUsingOAuthCallback,
    loginWithCredentials
}) {
    return (
        <>
            <Navbar transparent />
            <main>
                <section className="relative w-full h-full py-40 min-h-screen">
                    <div
                        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                        style={{
                            backgroundImage:
                                'url(' + require('assets/img/register_bg_2.png').default + ')'
                        }}
                    />
                    <Switch>
                        <Route
                            path="/auth/callback/:provider"
                            exact
                            render={(props) => (
                                <Authentication
                                    {...props}
                                    loginUsingOAuthCallback={loginUsingOAuthCallback}
                                />
                            )}
                        />
                        <Route
                            path="/auth/login"
                            exact
                            render={(props) => (
                                <Login {...props} loginWithCredentials={loginWithCredentials} />
                            )}
                        />
                        <Route
                            path="/auth/register"
                            exact
                            render={(props) => (
                                <Register
                                    {...props}
                                    registerWithCredentials={registerWithCredentials}
                                />
                            )}
                        />
                        <Route
                            path="/auth/verify"
                            exact
                            render={(props) => (
                                <VerifyEmail {...props} verifyEmail={callToVerifyEmail} />
                            )}
                        />
                        <Redirect from="/auth" to="/auth/login" />
                    </Switch>
                    <FooterSmall absolute />
                </section>
            </main>
        </>
    );
}
