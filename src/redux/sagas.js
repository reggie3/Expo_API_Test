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
      response: action.payload.response
    });
  } catch (e) {
    yield console.log('ERROR: showSuccessDialog');
  }
}

export function* sagaHandleAPISuccess() {
  yield takeEvery(['POST_FULFILLED', 'GET_FULFILLED', 'DELETE_FULFILLED', 'PUT_FULFILLED']
    , handleAPISuccess);
}

/****
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
      response: action.payload.error
    });
  } catch (e) {
    yield console.log('ERROR: showRejectedDialog');
  }
}

export function* sagaHandleAPIRejected() {
  yield takeEvery(['POST_REJECTED', 'GET_REJECTED', 'DELETE_REJECTED', 'PUT_REJECTED']
    , handleAPIRejected);
}

