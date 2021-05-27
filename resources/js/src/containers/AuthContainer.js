import React, { Component } from 'react';
import { withSnackbar } from 'notistack';

import Auth from '@/layouts/Auth.js';
import * as http from 'http/AuthServices';

class AuthContainer extends Component {
    constructor(props) {
        super(props);
        this.loginUsingOAuthCallback = this.loginUsingOAuthCallback.bind(this);
        this.loginWithCredentials = this.loginWithCredentials.bind(this);
        this.registerWithCredentials = this.registerWithCredentials.bind(this);
    }
    loginUsingOAuthCallback({ provider, payload }) {
        return http
            .loginWithOAuthCallback({ provider, payload })
            .then(({ data }) => {
                this.setUserToken(data.api_token);
                this.props.history.push('/');
                this.props.enqueueSnackbar('Logged in successfully', { variant: 'success' });
            })
            .catch((err) => {
                this.props.enqueueSnackbar('Error', { variant: 'error' });
                console.error(err);
                this.props.history.push('/auth/login');
            });
    }
    loginWithCredentials({ email, password }) {
        return http
            .loginWithCredentials({ email, password })
            .then(({ data }) => {
                this.setUserToken(data.api_token);
                this.props.history.push('/');
                this.props.enqueueSnackbar('Logged in successfully', { variant: 'success' });
            })
            .catch((err) => {
                console.error(err);
                this.props.enqueueSnackbar('Error', { variant: 'error' });
                this.props.history.push('/auth/login');
            });
    }
    registerWithCredentials({ email, name, password }) {
        return http
            .registerWithCredentials({ email, name, password })
            .then(({ data }) => {
                this.setUserToken(data.api_token);
                this.props.history.push('/');
                this.props.enqueueSnackbar('Welcome', { variant: 'success' });
            })
            .catch(() => {
                this.props.enqueueSnackbar('Error', { variant: 'error' });
                this.props.history.push('/auth/register');
            });
    }
    verifyEmail(payload) {
        return http
            .verifyEmail(payload)
            .then(() => {
                this.props.enqueueSnackbar('Success', { variant: 'success' });
                this.props.history.push('/');
            })
            .catch((err) => {
                console.error(err);
                this.props.enqueueSnackbar('Error', { variant: 'error' });
                this.props.history.push('/auth/login');
            });
    }
    setUserToken(token) {
        localStorage.setItem('token', token);
    }
    render() {
        return (
            <Auth
                loginWithCredentials={this.loginWithCredentials}
                loginUsingOAuthCallback={this.loginUsingOAuthCallback}
                registerWithCredentials={this.registerWithCredentials}
                callToVerifyEmail={this.verifyEmail}
            />
        );
    }
}
export default withSnackbar(AuthContainer);
