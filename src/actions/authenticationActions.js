import * as authenticationUtils from "../authenticationUtils";
import * as storageUtils from "../storageUtils";

let authenticationActions = {
    signInFacebook: function () {
        return {
            type: 'SIGN_IN_FACEBOOK',
            payload: authenticationUtils.signInFacebook()

        }
    },

    signInGoogle: function () {
        return {
            type: 'SIGN_IN_GOOGLE',
            payload: authenticationUtils.signInGoogle()
        }
    },

    setstoredAuthenticationChecked: function (bool) {
        return {
            type: 'SET_STORED_AUTHENTICATION_CHECKED',
            bool
        }
    },
        loadAuthenticationFromStorage: (storage) => {
        return {
            type: 'LOAD_AUTHENTICATION_FROM_STORAGE',
            payload: storageUtils.loadFromStorage(storage, 'authentication')
        }
    },
    /************************** Auth 0 related functions *******************************/
    initAuth: function (auth) {
        return {
            type: 'INIT_AUTH',
            auth
        }
    },
    signUp: function (auth0, newSignupInfo) {
        return {
            type: 'SIGN_UP',
            payload: authenticationUtils.signUp(auth0, newSignupInfo)
        }
    },
    signInAuth0User: function (auth0, signInInfo) {
        return {
            type: 'SIGN_IN_AUTH0_USER',
            payload: authenticationUtils.signInAuth0User(auth0, signInInfo)
        }
    },
    signOutUser: function () {
        return {
            type: 'SIGN_OUT_USER'
        }
    },
    resetPassword: function (auth0, emailAddress) {
        return {
            type: 'RESET_PASSWORD',
            payload: authenticationUtils.signInSocial(auth0, emailAddress)
        }
    },
}
export default authenticationActions;