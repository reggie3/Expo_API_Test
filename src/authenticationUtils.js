import appSecrets from './appSecrets';
import Auth0 from 'react-native-auth0';
import Expo from 'expo';
import jwtDecode from 'jwt-decode';

export const signUp = (auth0, newSignupInfo) => {
    // console.log({ newSignupInfo });
    return new Promise(function (resolve, reject) {
        auth0
            .authentication(appSecrets.auth0.clientID)
            .createUser(
            newSignupInfo.emailAddress,
            newSignupInfo.userName,
            newSignupInfo.password,
            appSecrets.auth0.connection
            )
            .then((user) => {
                debugger;
                console.log(user)
                resolve({
                    type: 'success',
                    auth0,
                    newSignupInfo
                })
            })
            .catch((error) => {
                console.log("signUp error: ", error);
                reject(error);
            })
    });
}

export const signInAuth0User = (auth0, signInInfo) => {
    return new Promise(function (resolve, reject) {
        auth0
            .authentication(appSecrets.auth0.clientID)
            .login(
            signInInfo.userName,
            signInInfo.password,
            appSecrets.auth0.connection
            )
            .then((credentials) => {
                resolve({
                    type: 'success',
                    credentials
                });
            })
            .catch((error) => {
                console.log("signInAuth0User error: ", error);
                reject(error);
            });
    });
}

export const getAuth0Profile = (accessToken) => {
    return new Promise(function (resolve, reject) {
        fetch(`https://reggie3.auth0.com/userinfo`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                resolve({
                    type: 'success',
                    jsonResponse
                });
            })
    });
}

export const resetAuth0Password = (accessToken) => {
    return new Promise(function (resolve, reject) {
        fetch(`https://reggie3.auth0.com/dbconnections/change_password`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "client_id": clientID,
                "email": email,
                "password": "",
                "connection": appSecrets.auth0.connection,
            }
        })
            .then((response) => {
                debugger
                return response.json();
            })
            .then((jsonResponse) => {
                resolve({
                    type: 'success',
                    jsonResponse
                });
            })
    });
}
export const signInSocial = (auth0, social) => {
    debugger
    return new Promise(function (resolve, reject) {
        var webAuth = new Auth0js.WebAuth({
            domain: 'reggie3.auth0.com',
            clientID: '4R53x9Kq8dzr55RrwouokMOO25aXxxzd'
        });
        webAuth.authorize({
            connection: social
        })
            .then((credentials) => {
                debugger
                resolve({
                    type: 'success',
                    credentials
                });
            })
            .catch((error) => {
                console.log("signInAuth0User error: ", error);
                reject(error);
            });

    });
}



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
                    reject({
                        type: 'error',
                    });
                }
                resolve({
                    type: 'success',
                    credentials: Object.assign({}, facebookJSONResponse, { accessToken })
                });
            })
            .catch(function (error) {
                console.log('Request failed', error);
                reject({
                    type: 'error',
                });
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
                    reject({
                        type: 'error',
                    });
                }
                resolve({
                    type: 'success',
                    pictureData: json
                });
            })
            .catch(function (error) {
                console.log('Request failed', error);
                reject({
                    type: 'error',
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
                        });
                    case 'cancel':
                        resolve({
                            type: 'error',
                            msg: 'login canceled'
                        })
                        break;
                    default:
                        resolve({
                            type: 'error',
                            msg: 'login failed'
                        })
                }
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    });
}

export const getUserInfo = (auth0, idToken) => {
    return new Promise(function (resolve, reject) {
        auth0
            .authentication(appSecrets.auth0.clientID)
            .tokenInfo(idToken)
            .then((profile) => {
                resolve({ profile });
            })
            .catch((error) => {
                console.log("getUserInfo error: ", error);
                reject(error);
            });
    });
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

export const resetPassword = (auth0, emailAddress) => {
    return new Promise(function (resolve, reject) {
        auth0
            .authentication(appSecrets.auth0.clientID)
            .resetPassword(emailAddress)
            .then((response) => {
                resolve({ response });
            })
            .catch((error) => {
                console.log("resetPassword error: ", error);
                reject(error);
            });
    });
}


