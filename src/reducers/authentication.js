

export default function authentication(authentication = {}, action) {
    switch (action.type) {
        case 'SIGN_IN_FACEBOOK_PENDING':
            return authentication;
        case 'SIGN_IN_FACEBOOK_REJECTED':
            return authentication;
        case 'SIGN_IN_FACEBOOK_FULFILLED':
            if (action.payload.type !== 'error')
                return Object.assign({}, authentication, {
                    signedIn: true,
                    type: 'facebook',
                    credentials: action.payload.credentials,
                    userInfo: {
                        id: action.payload.credentials.id,
                        name: action.payload.credentials.name,
                        email: action.payload.credentials.email,
                        accessToken: action.payload.credentials.accessToken,
                        birthday: action.payload.credentials.birthday
                    }
                });
            else
                return authentication;

        case 'SIGN_IN_GOOGLE_PENDING':
            return authentication;
        case 'SIGN_IN_GOOGLE_REJECTED':
            return authentication;
        case 'SIGN_IN_GOOGLE_FULFILLED':
            if (action.payload.type !== 'error')
                return Object.assign({}, authentication, {
                    signedIn: true,
                    type: 'google',
                    credentials: action.payload.credentials,
                    userInfo: {
                        id: action.payload.credentials.id,
                        name: action.payload.credentials.name,
                        accessToken: action.payload.credentials.accessToken,
                        email: action.payload.credentials.email,
                        profilePicture: action.payload.credentials.photoUrl
                    }
                });
            else
                return authentication;

        case 'SIGN_IN_TWITTER_PENDING':
            return authentication;
        case 'SIGN_IN_TWITTER_REJECTED':
            return authentication;
        case 'SIGN_IN_TWITTER_FULFILLED':
            if (action.payload.type !== 'error')
                return Object.assign({}, authentication, {
                    signedIn: true,
                    type: 'twitter',
                    credentials: action.payload.credentials,
                    userInfo: {
                        id: action.payload.credentials.id,
                        name: action.payload.credentials.name,
                        accessToken: action.payload.credentials.accessToken,
                        email: action.payload.credentials.email,
                    }
                });
            else
                return authentication;

        case 'SIGN_OUT_USER':
            return {
                signedIn: false,
                type: "",
                credentials: {},
                userInfo: {
                    profilePicture: undefined
                }
            }

        case 'GET_FACEBOOK_PROFILE_PICTURE_FULFILLED':
            /*console.log("*********************************************");
            */
            return Object.assign({}, authentication, {
                userInfo: Object.assign({}, authentication.userInfo,
                    { profilePicture: action.payload.pictureData.data.url })
            });

        case 'LOAD_AUTHENTICATION_FROM_STORAGE_FULFILLED':
            return action.payload.item;

        case 'SET_STORED_AUTHENTICATION_CHECKED':
            return Object.assign({}, authentication, { storedAuthenticationChecked: action.bool });

        default:
            return authentication;
    }
}