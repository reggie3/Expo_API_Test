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
        responseMessage: 'Responses will appear here.',
    },
    authentication: {
        signedIn: true,
        type: "facebook",
        credentials: {
            accessToken: "EAAGIUAxsTTUBAMU1rpT9aTJSxKmHSFLWn92piUxmBpuzjERaLFkl34ASeKUQolAwX976Hrlo3PuA1Fc6LBrVpOXCHzD6u6iWLp8hxi7sEeuNt2QjyKUyvAPEgG3BSDLN8iNpZC27PUc9le1R0wwlZCOs1f3PqXdtObcAOV1AZDZD",
            birthday: "02/18/1975",
            email: "reginald.johnson@gmail.com",
            id: "1537292946289246",
            name: "Reginald Johnson"
        },
        userInfo: {
            id: "1537292946289246",
            name: "Reginald Johnson",
            email: "reginald.johnson@gmail.com",
            accessToken: "EAAGIUAxsTTUBAMU1rpT9aTJSxKmHSFLWn92piUxmBpuzjERaLFkl34ASeKUQolAwX976Hrlo3PuA1Fc6LBrVpOXCHzD6u6iWLp8hxi7sEeuNt2QjyKUyvAPEgG3BSDLN8iNpZC27PUc9le1R0wwlZCOs1f3PqXdtObcAOV1AZDZD",
            birthday: "02/18/1975",
            profilePicture: "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/1933929_101615003190388_2730536_n.jpg?oh=7c685b149677416fd3c76b43e1a5cc61&oe=597ADC7C"
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
sagaMiddleware.run(MySagas.sagaHandleLoginCompleted);

