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
      case 'SIGN_IN_PENDING':
        message = "signing in";
        break;
      case 'SEND_VERIFICATION_CODE_AGAIN_PENDING':
        message = "sending verification code";
        break;
      case 'VERIFY_SIGN_UP_PENDING':
        message = "verifying account";
        break;
      case 'SIGN_UP_PENDING':
        message = "creating account";
        break;
      case 'REQUEST_PASSWORD_RESET_CODE_PENDING':
        message = "sending reset code";
        break;
      case 'ENTER_PASSWORD_RESET_CODE_PENDING':
        message = "updating password";
        break;
      case 'WRITE_PICTURE_DESCRIPTION_TO_DYNAMO_DB_PENDING':
        message = "updating";
        break;
      case 'SAVE_STORY_PENDING':
        message = "saving your story";
        break;
      case 'PUBLISH_STORY_PENDING':
        message = "uploading your story";
        break;
      default:
        message = "please wait";
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
  yield takeEvery(['SIGN_IN_AUTH0_USER_PENDING', 'SIGN_UP_USER_PENDING', 'SIGN_IN_PENDING', 'SEND_VERIFICATION_CODE_AGAIN_PENDING',
    'VERIFY_SIGN_UP_PENDING', 'SIGN_UP_PENDING',
    'REQUEST_PASSWORD_RESET_CODE_PENDING', 'ENTER_PASSWORD_RESET_CODE_PENDING',
    'ENTER_PASSWORD_RESET_CODE_PENDING',
    'WRITE_PICTURE_DESCRIPTION_TO_DYNAMO_DB_PENDING', 'SAVE_STORY_PENDING', 'PUBLISH_STORY_PENDING',
    'GET_ALL_STORIES_FROM_SERVER_PENDING',
    'GET_STORY_FROM_SERVER_BY_STORY_ID_PENDING',
    'GET_SAVED_STORY_FROM_SERVER_BY_STORY_ID_PENDING', "DELETE_PICTURE_FROM_BUCKET_PENDING",
    'CHANGE_STORY_UPLOAD_TYPE_ON_SERVER_PENDING']
    , showPendingDialog);
}

/****
 * hide pending dialog
 * 
 */
function* hidePendingDialog(action) {
  try {
    yield put({
      type: "CLOSE_PENDING_DIALOG",
      message: (action.payload && action.payload.message) ? action.payload.message : console.log(action),
      title: "Error"
    });
  } catch (e) {
    yield console.log('ERROR: hidePendingDialog %j', e);
  }
}

export function* sagaHidePendingDialog() {
  yield takeEvery(['GET_AUTH0_USER_INFO_FULFILLED', 'SIGN_UP_USER_FULFILLED',
    'SIGN_IN_AUTH0_USER_REJECTED', 'SIGN_UP_USER_REJECTED', 'SIGN_IN_FULFILLED', 'SEND_VERIFICATION_CODE_AGAIN_FULFILLED',
    'VERIFY_SIGN_UP_FULFILLED', 'SIGN_UP_FULFILLED', 'REQUEST_PASSWORD_RESET_CODE_FULFILLED',
    'ENTER_PASSWORD_RESET_CODE_FULFILLED',
    'SIGN_IN_REJECTED', 'SEND_VERIFICATION_CODE_AGAIN_REJECTED',
    'VERIFY_SIGN_UP_REJECTED', 'SIGN_UP_REJECTED',
    'REQUEST_PASSWORD_RESET_CODE_REJECTED',
    'ENTER_PASSWORD_RESET_CODE_REJECTED',
    'WRITE_PICTURE_DESCRIPTION_TO_DYNAMO_DB_FULFILLED',
    'WRITE_PICTURE_DESCRIPTION_TO_DYNAMO_DB_REJECTED', 'SAVE_STORY_REJECTED', 'SAVE_STORY_FULFILLED',
    'PUBLISH_STORY_REJECTED', 'PUBLISH_STORY_FULFILLED', 'GET_ALL_STORIES_FROM_SERVER_REJECTED',
    'GET_ALL_STORIES_FROM_SERVER_FULFILLED',
    'GET_STORY_FROM_SERVER_BY_STORY_ID_FULFILLED',
    'GET_SAVED_STORY_FROM_SERVER_BY_STORY_ID_FULFILLED',
    'GET_STORY_FROM_SERVER_BY_STORY_ID_REJECTED',
    'GET_SAVED_STORY_FROM_SERVER_BY_STORY_ID_REJECTED',
    "DELETE_PICTURE_FROM_BUCKET_REJECTED", "DELETE_PICTURE_FROM_BUCKET_FULFILLED",
    'CHANGE_STORY_UPLOAD_TYPE_ON_SERVER_FULFILLED', 'CHANGE_STORY_UPLOAD_TYPE_ON_SERVER_REJECTED'
  ], hidePendingDialog);
}

function* handleSignupRejected(action) {
  try {
    yield put({
      type: "SHOW_ERROR_DIALOG",
      message: (action.payload && action.payload.code) ? action.payload.code : console.log(action),
      title: "Error"
    });
  } catch (e) {
    yield console.log('ERROR: handleSignupRejected %j', e);
  }
}
export function* sagaHandleSignupRejected() {
  yield takeEvery(['SIGN_UP_REJECTED'], handleSignupRejected);
}


function* handleSignupFulfilled(action) {
  try {
    /*console.log("********handleSignupFulfilled*********");
    console.log({action});*/
    yield put({
      type: "SHOW_SUCCESS_DIALOG",
      message: 'account created',
      title: "account created"
    });

    yield put({
      type: "SIGN_IN_AUTH0_USER",
      payload: authenticationUtils.signInAuth0User(action.payload.auth0, action.payload.newSignupInfo)
    });
  } catch (e) {
    yield console.log('ERROR: handleSignupFulfilled %j', e);
  }
}
export function* sagaHandleSignupFulfilled() {
  yield takeEvery(['SIGN_UP_FULFILLED'], handleSignupFulfilled);
}


function* handleSignInFulfilled(action) {
  try {
    /*console.log("********handleSignInFulfilled*********");
    console.log({action});*/
    yield put({
      type: "NAVIGATE_BACK",
    });

  } catch (e) {
    yield console.log('ERROR: handleSignInFulfilled %j', e);
  }
}
export function* sagaHandleSignInFulfilled() {
  yield takeEvery(['SIGN_IN_AUTH0_USER_FULFILLED'], handleSignInFulfilled);
}

function* handleSignInRejected(action) {
  try {
    console.log("********handleSignInRejected*********");
    console.log({ action });
    let signInErrorMessage;
    switch (action.payload.name) {
      case 'invalid_user_password':
        signInErrorMessage = 'Wrong username or password';
        break;
      default:
        signInErrorMessage = 'Error signing in';
        break;
    }

    yield put({
      type: "SHOW_ERROR_DIALOG",
      title: "Sign In Error",
      message: signInErrorMessage
    });

  } catch (e) {
    yield console.log('ERROR: handleSignInRejected %j', e);
  }
}
export function* sagaHandleSignInRejected() {
  yield takeEvery(['SIGN_IN_AUTH0_USER_REJECTED'], handleSignInRejected);
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


function* getAuth0ProfileAfterLogin(action) {
  if (action.payload.type === 'success') {
    console.log({ action })
    yield put({
      type: "GET_AUTH0_USER_INFO",
      payload: authenticationUtils.getAuth0Profile(
        action.payload.credentials.access_token
      )
    });
  }
}
export function* sagaGetAuth0ProfileAfterLogin() {
  yield takeEvery(['SIGN_IN_AUTH0_USER_FULFILLED'], getAuth0ProfileAfterLogin);
}
