

export default function authentication(authentication = {}, action) {



    switch (action.type) {
        case 'INIT_AUTH':
            return Object.assign({}, authentication, { auth0: action.auth })

        case 'SIGN_UP_AUTH0_FULFILLED':
            console.log(`sign up SIGN_UP_FULFILLED: `, action.payload);
            return authentication;
        case 'SIGN_UP_AUTH0_REJECTED':
            console.log(`sign up SIGN_UP_REJECTED: `, action.payload);
            return authentication;

        case 'SIGN_IN_AUTH0_USER_REJECTED':
            debugger
            return authentication;
        case 'SIGN_IN_AUTH0_USER_FULFILLED':
            return Object.assign({}, authentication, {
                signedIn: true,
                type: 'auth0',
                credentials: action.payload.credentials,
                userInfo: {
                    accessToken: action.payload.credentials.access_token,
                }
            });

        case 'GET_AUTH0_USER_INFO':
            return authentication;
        case 'GET_AUTH0_USER_INFO_PENDING':
            return authentication;
        case 'GET_AUTH0_USER_INFO_REJECTED':
            return authentication;
        case 'GET_AUTH0_USER_INFO_FULFILLED':
            return Object.assign({}, authentication, {
                userInfo: Object.assign({}, authentication.userInfo, {
                    id: action.payload.jsonResponse.user_id,
                    name: action.payload.jsonResponse.username,
                    email: action.payload.jsonResponse.email,
                    profilePicture: action.payload.jsonResponse.picture
                })
            });

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
            if (action.payload.type !== 'error') {
                return Object.assign({}, authentication, {
                    credentials: action.payload.item.credentials,
                    signedIn: true,
                    storedAuthenticationChecked: true,
                    type: action.payload.item.type,
                    userInfo: action.payload.item.userInfo
                })
            }
            else{
                return Object.assign({}, authentication, {
                    storedAuthenticationChecked: true,
                })
            }

        case 'SET_STORED_AUTHENTICATION_CHECKED':
            return Object.assign({}, authentication, { storedAuthenticationChecked: action.bool });

        default:
            return authentication;
    }
}