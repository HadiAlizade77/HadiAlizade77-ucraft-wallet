import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth/reducers';
import wallet from './wallet/reducers';
import transactions from './transactions/reducers';
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
    auth,
    wallet,
    transactions
});

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
