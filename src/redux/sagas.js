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
  yield takeEvery(['POST_PENDING', 'GET_PENDING', 'DELETE_PENDING', 'PUT_PENDING']
    , showPendingDialog);
}


/****
 * showSuccessDialog
 * 
 */
function* showSuccessDialog(action) {
  try {
    let message = "";
    switch (action.type) {
      case 'POST_FULFILLED':
        message = "performing post";
        break;
      case 'GET_FULFILLED':
        message = "performing get";
        break;
      case 'DELETE_FULFILLED':
        message = "performing put";
        break;
      case 'PUT_FULFILLED':
        message = "performing delete";
        break;
    }
    yield put({
      type: "CLOSE_PENDING_DIALOG",
    });
    yield put({
      type: "SHOW_SUCCESS_DIALOG",
      message: message
    });
  } catch (e) {
    yield console.log('ERROR: showSuccessDialog');
  }
}

export function* sagaShowSuccessDialog() {
  yield takeEvery(['POST_FULFILLED', 'GET_FULFILLED', 'DELETE_FULFILLED', 'PUT_FULFILLED']
    , showSuccessDialog);
}

/****
 * showRejectedDialog
 * 
 */
function* showRejectedDialog(action) {
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
    }
    yield put({
      type: "SHOW_REJECTED_DIALOG",
      message: message
    });
  } catch (e) {
    yield console.log('ERROR: showRejectedDialog');
  }
}

export function* sagaShowRejectedDialog() {
  yield takeEvery(['POST_REJECTED', 'GET_REJECTED', 'DELETE_REJECTED', 'PUT_REJECTED']
    , showRejectedDialog);
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
