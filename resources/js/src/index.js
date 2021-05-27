import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fetchAuthData } from './store/auth/actions';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/styles/tailwind.css';
import { SnackbarProvider } from 'notistack';
// layouts
import Admin from '@/layouts/Admin.js';
import Auth from '@/containers/AuthContainer.js';

import store from './store';
const isAuthenticated = () => {
    const authenticated = () => store.getState().auth.isAuthenticated;
    if (authenticated()) return true;
    const userToken = localStorage.getItem('token');
    if (userToken) {
        store.dispatch(fetchAuthData());
        return true;
    } else return false;
};
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        exact
        {...rest}
        render={(props) =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/auth/login' }} />
            )
        }
    />
);
ReactDOM.render(
    <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/auth" component={Auth} />
                    <PrivateRoute path="/" component={Admin} />
                </Switch>
            </BrowserRouter>
        </Provider>
    </SnackbarProvider>,
    document.getElementById('root')
);
