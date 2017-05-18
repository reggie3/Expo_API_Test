import * as authenticationUtils from "../authenticationUtils";
import * as storageUtils from "../storageUtils";

let authenticationActions = {
  
    signOutUser: function () {
        return {
            type: 'SIGN_OUT_USER'
        }
    },
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

    signInTwitter: function () {
        return {
            type: 'SIGN_IN_TWITTER',
            payload: authenticationUtils.signInTwitter()
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
    }
}
export default authenticationActions;