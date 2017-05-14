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
    'SIGN_IN_GOOGLE_PENDING', 'SIGN_IN_FACEBOOK_PENDING']
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
        break;
      case 'GET_FULFILLED':
        message = "successful get";
        break;
      case 'DELETE_FULFILLED':
        message = "successful delete";
        break;
      case 'PUT_FULFILLED':
        message = "successful put";
        break;
      case 'SIGN_IN_GOOGLE_FULFILLED':
        message = "successful sign in with Google";
        break;
      case 'SIGN_IN_FACEBOOK_FULFILLED':
        message = "successful sign in with Facebook";
        break;

    }
    yield put({
      type: "CLOSE_PENDING_DIALOG",
    });
    yield put({
      type: "SHOW_SUCCESS_DIALOG",
      message: message
    });
    yield put({
      type: 'UPDATE_RESPONSE_MESSAGE',
      responseType: action.payload.responseType,
      responseMessage: action.payload.responseMessage
    });
  } catch (e) {
    yield console.log('ERROR: showSuccessDialog');
  }
}

export function* sagaHandleAPISuccess() {
  yield takeEvery(['POST_FULFILLED', 'GET_FULFILLED', 'DELETE_FULFILLED', 'PUT_FULFILLED']
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
  yield takeEvery(['SIGN_IN_GOOGLE_FULFILLED', 'SIGN_IN_FACEBOOK_FULFILLED']
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
        message = "failed to sign in with Facebook";
        break;
    }
    yield put({
      type: "CLOSE_PENDING_DIALOG",
    });
    yield put({
      type: "SHOW_REJECTED_DIALOG",
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
    'SIGN_IN_GOOGLE_REJECTED', 'SIGN_IN_FACEBOOK_REJECTED']
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
