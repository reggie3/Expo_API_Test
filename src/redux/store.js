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
    },
    authentication: {
        signedIn: false,
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

//sagaMiddleware.run(MySagas.sagaActivateStory);
//sagaMiddleware.run(MySagas.sagaDownloadPicture);
sagaMiddleware.run(MySagas.sagaShowPendingDialog);
sagaMiddleware.run(MySagas.sagaHidePendingDialog);
sagaMiddleware.run(MySagas.sagaHandleSignupRejected);
sagaMiddleware.run(MySagas.sagaHandleSignupFulfilled);
sagaMiddleware.run(MySagas.sagaHandleSignInFulfilled);
sagaMiddleware.run(MySagas.sagaHandleSignInRejected);
sagaMiddleware.run(MySagas.sagaGetFacebookPictureAfterLogin);
sagaMiddleware.run(MySagas.sagaGetAuth0ProfileAfterLogin);

