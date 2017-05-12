import * as authenticationUtils from "../authenticationUtils";

let authenticationActions = {
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
    signInSocial: function (auth0, social) {
        return {
            type: 'SIGN_IN_SOCIAL',
            payload: authenticationUtils.signInSocial(auth0, social)
        }
    },
    resetPassword: function (auth0, emailAddress) {
        return {
            type: 'RESET_PASSWORD',
            payload: authenticationUtils.signInSocial(auth0, emailAddress)
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
    }
}
export default authenticationActions;