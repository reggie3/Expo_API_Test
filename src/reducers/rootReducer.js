import { combineReducers } from 'redux';

import appState from './appState';
import authentication from './authentication';
import modals from './modals';
import apiTest from './apiTest';

const rootReducer = combineReducers({
    modals,
    appState,
    authentication,
    apiTest
});

export default rootReducer;