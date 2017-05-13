import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/rootReducer';
import createPromiseMiddleware from 'redux-promise-middleware';
import createSagaMiddleware from 'redux-saga';
import * as MySagas from './sagas';

export let defaultState = {


    appState: {

        navigation: {
            currentScreen: "ApiTesting",
            screenStack: ["ApiTesting"],
            screenName: undefined
        },
        responseMessage: 'Responses will appear here.'
    },
    authentication: {
        signedIn: false,
        type:"",
        credentials: {},
        userInfo: {
            profilePicture: undefined
        }
    },
    apiTest: {

    },
    modals: {
        showMainMenu: false,
        showErrorDialog: {
            open: false,
            title: "Error Dialog test title",
            message: "Error Dialog test message"
        },
        showSuccessDialog: {
            open: false,
            title: "Success Dialog test title",
            message: "Success Dialog test message"
        },
        showPendingDialog: {
            open: false,
            message: "initial text"
        },
    },
};

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const promiseMiddleware = createPromiseMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    defaultState, composeEnhancers(
        applyMiddleware(
            promiseMiddleware, sagaMiddleware,
            logger,
        ))
);

sagaMiddleware.run(MySagas.sagaShowPendingDialog);
sagaMiddleware.run(MySagas.sagaHandleAPISuccess);
sagaMiddleware.run(MySagas.sagaHandleAPIRejected);
sagaMiddleware.run(MySagas.sagaGetFacebookPictureAfterLogin);

