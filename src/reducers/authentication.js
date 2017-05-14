

export default function authentication(authentication = {}, action) {



    switch (action.type) {
        case 'INIT_AUTH':
            return Object.assign({}, authentication, { auth0: action.auth })

        case 'SIGN_UP_PENDING':
            console.log(`sign up SIGN_UP_PENDING: `, action.payload);
            return authentication;

        case 'SIGN_UP_FULFILLED':
            console.log(`sign up SIGN_UP_FULFILLED: `, action.payload);
            return authentication;

        case 'SIGN_UP_REJECTED':
            console.log(`sign up SIGN_UP_REJECTED: `, action.payload);
            switch (action.payload.code) {
                case 'username_exists':
                    console.log("user name exists");
                    break;
            }
            return authentication;

        case 'SIGN_IN_AUTH0_USER':
            return authentication;
        case 'SIGN_IN_AUTH0_USER_PENDING':
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
            // debugger;
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
            debugger;*/
            return Object.assign({}, authentication, {
                userInfo: Object.assign({}, authentication.userInfo,
                    { profilePicture: action.payload.pictureData.data.url })
            });

        default:
            return authentication;
    }
}