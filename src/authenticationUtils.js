import appSecrets from './appSecrets';
import Expo from 'expo';

export const signInFacebook = () => {
    return new Promise(function (resolve, reject) {
        let accessToken = '';
        Expo.Facebook.logInWithReadPermissionsAsync(appSecrets.facebook.clientID, {
            permissions: ['public_profile', 'email', 'user_birthday'],
        })
            .then((response) => {

                switch (response.type) {
                    case 'success':
                        // token is a string giving the access token to use 
                        // with Facebook HTTP API requests.
                        return response.token;
                    case 'cancel':
                        reject({
                            type: 'error',
                            msg: 'login canceled'
                        })
                        break;
                    default:
                        reject({
                            type: 'error',
                            msg: 'login failed'
                        })
                }
            })
            .then((token) => {
                accessToken = token;
                return fetch(`https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${token}`);
            })
            .then((response) => {
                return response.json();
            })
            .then((facebookJSONResponse) => {
                console.log({ facebookJSONResponse });
                if (facebookJSONResponse.hasOwnProperty('error')) {
                    resolve({
                        type: 'error',
                    });
                }
                resolve(resolve({
                    type: 'success',
                    credentials: Object.assign({}, facebookJSONResponse, { accessToken })
                }));
            })
            .catch(function (error) {
                resolve({
                    type: 'error',
                    msg: 'Facebook login failed'
                })
            });
    });
}

export const getFacebookProfilePicture = (accessToken, facebookUserID) => {
    return new Promise(function (resolve, reject) {
        fetch(`https://graph.facebook.com/${facebookUserID}/picture?redirect=false&type=large&access_token=${accessToken}`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.hasOwnProperty('error')) {
                    resolve({
                        type: 'error',
                    });
                }
                resolve(resolve({
                    type: 'success',
                    pictureData: json
                }));
            })
            .catch(function (error) {
                console.log('Request failed', error);
                resolve({
                    type: 'error',
                    msg: 'failed to get Facebook picture'
                });
            });
    });
}

export const signInGoogle = () => {
    return new Promise(function (resolve, reject) {
        let responseTokens = {};
        Expo.Google.logInAsync({
            androidClientId: appSecrets.google.oauth.android,
            iosClientId: appSecrets.google.oauth.ios,
            scopes: ['profile', 'email']
        })
            .then((response) => {
                switch (response.type) {
                    case 'success':
                        resolve({
                            type: 'success',
                            credentials: Object.assign({}, response.user, {
                                accessToken: response.accessToken,
                                idToken: response.idToken,
                                serverAuthCode: response.serverAuthCode,
                                refreshToken: response.refreshToken
                            })
                        }));
                    case 'cancel':
                        resolve({
                            type: 'error',
                            msg: 'login canceled'
                        })
                        break;
                    default:
                        resolve({
                            type: 'error',
                            msg: 'Google login failed'
                        })
                }
            })
            .catch(function (error) {
                resolve({
                    type: 'error',
                    msg: 'login failed'
                })
            });
    });
}

/********************* Auth 0 Functions **********************************/
// https://auth0.com/docs/api/authentication#signup
export const signUpAuth0User = (newSignupInfo) => {
    return fetch(`https://${appSecrets.auth0.domain}/dbconnections/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: appSecrets.auth0.clientID,
            email: newSignupInfo.username,
            password: newSignupInfo.password,
            connection: appSecrets.auth0.connection,
            user_metadata: { plan: 'normal' }
        })
    })
        .then((credentials) => {
            return credentials.json();
        })
        .then((json) => {
            if (json.hasOwnProperty("error")) {
                return ({
                    type: 'error',
                    error: json.error,
                    errorDescription: json.error_description
                });
            }
            return ({
                type: 'success',
                newSignupInfo,
            });
        })
        .catch((error) => {
            return ({
                type: 'error',
                error
            });
        });
}

// https://auth0.com/docs/api/authentication#database-ad-ldap-active-
export const signInAuth0User = (signInInfo) => {
    return fetch(`https://${appSecrets.auth0.domain}/oauth/ro`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: appSecrets.auth0.clientID,
                username: signInInfo.username,
                password: signInInfo.password,
                connection: appSecrets.auth0.connection,
                scope: "openid",
            })
        })
        .then((credentials) => {
            return credentials.json();
        })
        .then((json) => {
            if (json.hasOwnProperty("error")) {
                return ({
                    type: 'error',
                    error: json.error,
                    errorDescription: json.error_description
                });
            }
            return ({
                type: 'success',
                credentials: json
            });
        })
        .catch((error) => {
            return ({
                type: 'error',
                error
            });
        });
}

// https://auth0.com/docs/api/authentication#user-profile
export const getAuth0Profile = (accessToken) => {
    return fetch(`https://${appSecrets.auth0.domain}/userinfo`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((response) => {
            if (response.status !== 200) {
                return ({
                    type: 'error',
                    error: 'error geting Auth0 profile'
                });
            }
            return response.json();
        })
        .then((jsonResponse) => {
            
            if(jsonResponse.hasOwnProperty('type')){
                return jsonResponse;
            }
            return ({
                type: 'success',
                jsonResponse
            });
        })
}


// https://auth0.com/docs/api/authentication#change-password
export const changePassword = (auth0, emailAddress) => {
    return fetch(`https://${appSecrets.auth0.domain}/dbconnections/change_password`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
             body: JSON.stringify({
                client_id: appSecrets.auth0.clientID,
                email: signInInfo.username,
                password: "",
                connection: appSecrets.auth0.connection
            })
        })
        .then((response) => {
            if (response.status !== 200) {
                return ({
                    type: 'error',
                    error: 'error geting Auth0 profile'
                });
            }
            return response.json();
        })
        .then((jsonResponse) => {
            if(jsonResponse.hasOwnProperty('type')){
                return jsonResponse;
            }
            return ({
                type: 'success',
                jsonResponse
            });
        })
}

export const refreshToken = (auth0, refreshToken) => {
    return new Promise(function (resolve, reject) {
        auth0
            .authentication(appSecrets.auth0.clientID)
            .refreshToken(refreshToken)
            .then((response) => {
                resolve({ response });
            })
            .catch((error) => {
                console.log("refreshToken error: ", error);
                reject(error);
            });
    });
}

