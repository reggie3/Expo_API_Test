import { put, select, takeEvery } from 'redux-saga/effects'

import * as authenticationUtils from '../authenticationUtils';

import { call } from 'redux-saga/effects'

export const getProject = (state) => state.navigation;

/****
 * showPendingDialog
 * 
 */
function* showPendingDialog(action) {
  try {
    // console.log("showPendingDialog");
    let message = "";
    switch (action.type) {
      case 'POST_PENDING':
        message = "performing post";
        break;
      case 'GET_PENDING':
        message = "performing get";
        break;
      case 'PUT_PENDING':
        message = "performing put";
        break;
      case 'DELETE_PENDING':
        message = "performing delete";
        break;
      case 'SIGN_IN_GOOGLE_PENDING':
        message = "signing in with Google";
        break;
      case 'SIGN_IN_FACEBOOK_PENDING':
        message = "signing in with Facebook";
        break;
      case 'SIGN_IN_AUTH0_USER_PENDING':
        message = "signing in with Auth0";
        break;
      case 'SIGN_UP_AUTH0_USER_PENDING':
        message = "creating account with Auth0";
        break;
    }
    yield put({
      type: "SHOW_PENDING_DIALOG",
      message: message
    });
  } catch (e) {
    yield console.log('ERROR: showPendingDialog');
  }
}

export function* sagaShowPendingDialog() {
  yield takeEvery(['POST_PENDING', 'GET_PENDING', 'DELETE_PENDING', 'PUT_PENDING',
    'SIGN_IN_GOOGLE_PENDING', 'SIGN_IN_FACEBOOK_PENDING',
    'SIGN_IN_AUTH0_USER_PENDING', 'SIGN_UP_AUTH0_USER_PENDING']
    , showPendingDialog);
}


/****
 * handleAPISuccess
 * 
 */
function* handleAPISuccess(action) {
  try {
    let message = "";
    switch (action.type) {
      case 'POST_FULFILLED':
        message = "successful post";
        if (action.payload.type === 'error') {
          message = `${action.payload.response}`;
        }
        break;
      case 'GET_FULFILLED':
        message = "successful get";
        if (action.payload.type === 'error') {
          message = `${action.payload.response}`;
        }
        break;
      case 'DELETE_FULFILLED':
        message = "successful delete";
        if (action.payload.type === 'error') {
          message = `${action.payload.response}`;
        }
        break;
      case 'PUT_FULFILLED':
        message = "successful put";
        if (action.payload.type === 'error') {
          message = `${action.payload.response}`;
        }
        break;
      case 'SIGN_IN_GOOGLE_FULFILLED':
        message = `${action.payload.type} sign in with Google`;
        if (action.payload.type === 'error') {
          message = `${action.payload.response}`;
        }
        break;
      case 'SIGN_IN_FACEBOOK_FULFILLED':
        message = `${action.payload.type} sign in with Facebook`;
        if (action.payload.type === 'error') {
          message = `${action.payload.response}`;
        }
        break;
      case 'SIGN_IN_AUTH0_USER_FULFILLED':
        if (action.payload.type === 'error') {
          message = `${action.payload.errorDescription}`;
        }
        else {
          message = 'Successful login with Auth0';
        }
        break;

    }
    yield put({
      type: "CLOSE_PENDING_DIALOG",
    });
    if (action.payload.type === 'success') {
      yield put({
        type: "SHOW_SUCCESS_DIALOG",
        message: message
      });
    }
    else {
      yield put({
        type: "SHOW_ERROR_DIALOG",
        message: message
      });
    }

    yield put({
      type: 'UPDATE_RESPONSE_MESSAGE',
      responseType: action.payload.type,
      responseMessage: action.payload.response
    });
  } catch (e) {
    yield console.log('ERROR: showSuccessDialog');
  }
}

export function* sagaHandleAPISuccess() {
  yield takeEvery(['SIGN_IN_AUTH0_USER_FULFILLED', 'POST_FULFILLED', 'GET_FULFILLED', 'DELETE_FULFILLED', 'PUT_FULFILLED']
    , handleAPISuccess);
}


/****************************************************************
 * handleLoginCompleted
 */
function* handleLoginCompleted(action) {
  try {

    yield put({
      type: "CLOSE_PENDING_DIALOG",
    });

  } catch (e) {
    yield console.log('ERROR: showSuccessDialog');
  }
}
export function* sagaHandleLoginCompleted() {
  yield takeEvery(['SIGN_IN_GOOGLE_FULFILLED', 'SIGN_IN_FACEBOOK_FULFILLED',
    'SIGN_IN_AUTH0_USER_FULFILLED']
    , handleLoginCompleted);
}

/****************************************************************
 * handleAPIRejected
 * 
 */
function* handleAPIRejected(action) {
  try {
    // console.log("showRejectedDialog");
    let message = "";
    switch (action.type) {
      case 'POST_REJECTED':
        message = "post rejected";
        break;
      case 'GET_REJECTED':
        message = "get rejected";
        break;
      case 'PUT_REJECTED':
        message = "put rejected";
        break;
      case 'DELETE_REJECTED':
        message = "delete rejected";
        break;
      case 'SIGN_IN_GOOGLE_REJECTED':
        message = "failed to sign in with Google";
        break;
      case 'SIGN_IN_FACEBOOK_REJECTED':
        message = action.payload.msg;
        break;
      case 'SIGN_IN_AUTH0_USER_REJECTED':
        message = "failed to sign in with Auth0";
        break;
      case 'SIGN_UP_AUTH0_USER_REJECTED':
        message = "failed to create Auth0 account";
        break;

    }
    yield put({
      type: "CLOSE_PENDING_DIALOG",
    });
    yield put({
      type: "SHOW_ERROR_DIALOG",
      message: message
    });
    yield put({
      type: 'UPDATE_RESPONSE_MESSAGE',
      responseType: action.payload.responseType,
      responseMessage: action.payload.responseMessage
    });
  } catch (e) {
    yield console.log('ERROR: showRejectedDialog');
  }
}

export function* sagaHandleAPIRejected() {
  yield takeEvery(['POST_REJECTED', 'GET_REJECTED', 'DELETE_REJECTED', 'PUT_REJECTED',
    'SIGN_IN_GOOGLE_REJECTED', 'SIGN_IN_FACEBOOK_REJECTED',
    'SIGN_IN_AUTH0_USER_REJECTED', 'SIGN_UP_AUTH0_USER_REJECTED']
    , handleAPIRejected);
}

function* getFacebookPictureAfterLogin(action) {

  if (action.payload.type === 'success') {
    console.log({ action })
    yield put({
      type: "GET_FACEBOOK_PROFILE_PICTURE",
      payload: authenticationUtils.getFacebookProfilePicture(
        action.payload.credentials.accessToken,
        action.payload.credentials.id
      )

    });
  }
}
export function* sagaGetFacebookPictureAfterLogin() {
  yield takeEvery(['SIGN_IN_FACEBOOK_FULFILLED'], getFacebookPictureAfterLogin);
}

function* handleStorageInitialization(action) {
  try {
    console.log({ action });
  } catch (e) {
    yield console.log('ERROR: showRejectedDialog');
  }
}
export function* sagaHandleStorageInitialization() {
  yield takeEvery(['SAVE_STORAGE'], handleStorageInitialization);
}

function* handleSignInAuth0UserAfterSignUp(action) {
  try {
    if (action.payload.type === 'success') {
      console.log({ action })
      yield put({
        type: "SIGN_IN_AUTH0_USER",
        payload: authenticationUtils.signInAuth0User({
          username: action.payload.newSignupInfo.username,
          password: action.payload.newSignupInfo.password
        })
      });
    }
    else {
      yield put({
        type: "SIGN_UP_AUTH0_USER_REJECTED",
        payload: {
          type: action.payload.type,
          error: action.payload.error
        }
      })
    }
  } catch (e) {
    yield console.log('ERROR: showRejectedDialog');
  }
}
export function* sagaHandleSignInAuth0UserAfterSignUp() {
  yield takeEvery(['SIGN_UP_AUTH0_USER_FULFILLED'], handleSignInAuth0UserAfterSignUp);
}

function* getAuth0ProfileAfterUserSignIn(action) {
  try {
    if (action.payload.type === 'success') {
      yield put({
        type: "GET_AUTH0_USER_INFO",
        payload: authenticationUtils.getAuth0Profile(
          action.payload.credentials.access_token
        )
      });
    }
  } catch (e) {
    yield console.log('ERROR: showRejectedDialog');
  }
}
export function* sagaGetAuth0ProfileAfterUserSignIn() {
  yield takeEvery(['SIGN_IN_AUTH0_USER_FULFILLED'], getAuth0ProfileAfterUserSignIn);
}

