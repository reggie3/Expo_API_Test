// ACTIONS for modals portion of store

let modalsActions = {
    showLoginDialog: function () {
        return {
            type: 'SHOW_LOGIN_DIALOG'
        }
    },
    showSignUpDialog: function () {
        return {
            type: 'SHOW_SIGNUP_DIALOG'
        }
    },
    closeSignInSignUpDialog: function () {
        return {
            type: 'CLOSE_LOGIN_SIGNUP_DIALOGS'
        }
    },
    showMainMenu: function(bool){
        return{
            type: 'SHOW_MAIN_MENU',
            bool
        }
    },
    // verification code dialog that shows up immediately after 
    // signing in
    showSignUpVerificationDialog: function (action) {
        return {
            type: 'SHOW_SIGN_UP_VERIFICATION_DIALOG'
        }
    },
    closeSignUpVerificationDialog: function () {
        return {
            type: 'CLOSE_SIGN_UP_VERIFICATION_DIALOG'
        }
    },

    // dialog that to request another verification code
    showResendVerificationCodeDialog: function (action) {
        return {
            type: 'SHOW_RESEND_VERIFICATION_CODE_DIALOG'
        }
    },
    closeResendVerificationCodeDialog: function () {
        return {
            type: 'CLOSE_RESEND_VERIFICATION_CODE_DIALOG'
        }
    },

    showPasswordRecoveryDialog: function (action) {
        return {
            type: 'SHOW_PASSWORD_RECOVERY_DIALOG'
        }
    },
    closePasswordRecoveryDialog: function () {
        return {
            type: 'CLOSE_PASSWORD_RECOVERY_DIALOG'
        }
    },
    showErrorDialog: function (title, message) {
        return {
            type: 'SHOW_ERROR_DIALOG',
            title,
            message
        }
    },
    closeErrorDialog: function () {
        return {
            type: 'CLOSE_ERROR_DIALOG'
        }
    },

    // actions for the generic success dialog
    showSuccessDialog: function (title, message) {
        console.log(title + " " + message);
        return {
            type: 'SHOW_SUCCESS_DIALOG',
            title,
            message
        }
    },
    closeSuccessDialog: function () {
        return {
            type: 'CLOSE_SUCCESS_DIALOG'
        }
    },

    // user enabled dialog that lets the request a code
    // that lets them change their password
    showRequestPasswordResetCodeDialog: function () {
        return {
            type: 'SHOW_REQUST_PASSWORD_RESET_CODE_DIALOG',
        }
    },
    closeRequestPasswordResetCodeDialog: function () {
        return {
            type: 'CLOSE_REQUST_PASSWORD_RESET_CODE_DIALOG'
        }
    },

    // user enabled dialog that lets the user request a code
    // that lets them change their password
    showEnterPasswordResetCodeDialog: function (action, cognitoUser) {
        return {
            type: 'SHOW_ENTER_PASSWORD_RESET_CODE_DIALOG',
            cognitoUser
        }
    },
    closeEnterPasswordResetCodeDialog: function () {
        return {
            type: 'CLOSE_ENTER_PASSWORD_RESET_CODE_DIALOG'
        }
    },

    // user enabled dialog that lets the user input details on a picture
    // for storage to a database later
    showEnterPictureDescriptionDialog: function (file) {
        return {
            type: 'SHOW_ENTER_PICTURE_DESCRIPTION_DIALOG',
            file
        }
    },
    closeEnterPictureDescriptionDialog: function () {
        return {
            type: 'CLOSE_ENTER_PICTURE_DESCRIPTION_DIALOG'
        }
    },
    uploadPictureDescription: function () {
        return {
            type: 'UPLOAD_PICTURE_DESCRIPTION_DIALOG'
        }
    },
    showUpdatePictureDescriptionDialog: function (picture, pictureId) {
        return {
            type: 'SHOW_UPDATE_PICTURE_DESCRIPTION_DIALOG',
            picture,
            pictureId
        }
    },
    closeUpdatePictureDescriptionDialog: function () {
        return {
            type: 'CLOSE_UPDATE_PICTURE_DESCRIPTION_DIALOG'
        }
    },
    showEmojiPicker: function (locationId, pickerAnchor) {
        return {
            type: 'SHOW_EMOJI_PICKER',
            locationId,
            pickerAnchor
        }
    },
    closeEmojiPicker: function () {
        return {
            type: 'CLOSE_EMOJI_PICKER'
        }
    },

}

export default modalsActions;