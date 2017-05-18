import * as authenticationUtils from "../authenticationUtils";

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

    signInTwitter: function () {
        return {
            type: 'SIGN_IN_TWITTER',
            payload: authenticationUtils.signInTwitter()
        }
    }
}
export default authenticationActions;