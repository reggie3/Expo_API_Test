import appSecrets from './appSecrets';

const createAuthorizationString = (service, userInfo) => {
    // either make sure this string is on one line or strip out characters that are
    // not allowed in http headers by some APIs
    let authString = `${service}||${userInfo.accessToken}||${userInfo.id}||${userInfo.email}`;
    return authString;
}

export const doPost = (service, userInfo) => {
    return new Promise(function (resolve, reject) {
        fetch(appSecrets.aws.apiURL, {
            method: 'POST',
            headers: {
                'authorizationToken':  createAuthorizationString(service, userInfo)
            },
            body: JSON.stringify({
                'bodyParam1': 'this is the first param',
                'bodyParam2': 'this is the second param'
            })
        })
            .then((response) => {
                return response.text();
            })
            .then((response) => {
                resolve(resolve({
                    type: 'success',
                    response
                }));
            })
            .catch((error) => {
                console.log({ error });
                reject({
                    type: 'error',
                    msg: error.message
                });
            })
    });
}
export const doGet = (service, userInfo) => {
    return new Promise(function (resolve, reject) {
        fetch(appSecrets.aws.apiURL, {
            method: 'GET',
            headers: {
                'authorizationToken': createAuthorizationString(service, userInfo)
            },
            /* 
            *** GET methods don't take a body parameter.  Uncommenting the lines below
            will cause an error ***
             body: JSON.stringify({
                 'bodyParam1': 'this is the first param',
                 'bodyParam2': 'this is the second param'
             })*/
        })
            .then((response) => {
                return response.text();
            })
            .then((response) => {
                resolve({
                    type: 'success',
                    response
                });
            })
            .catch((error) => {
                console.log({ error });
                reject({
                    type: 'failure',
                    error: error.message
                });
            })
    });
}
export const doPut = (service, userInfo) => {
    return new Promise(function (resolve, reject) {
        fetch(appSecrets.aws.apiURL, {
            method: 'PUT',
            headers: {
                'authorizationToken': createAuthorizationString(service, userInfo)
            },
            body: JSON.stringify({
                'bodyParam1': 'this is the first param',
                'bodyParam2': 'this is the second param'
            })
        })
            .then((response) => {
                return response.text();
            })
            .then((response) => {
                resolve(resolve({
                    type: 'success',
                    response
                }));
            })
            .catch((error) => {
                console.log({ error });
                reject({
                    type: 'failure',
                    error: error.message
                });
            })
    });
}

export const doDelete = (service, userInfo) => {
    return new Promise(function (resolve, reject) {
        fetch(appSecrets.aws.apiURL, {
            method: 'DELETE',
            headers: {
                'authorizationToken': createAuthorizationString(service, userInfo)
            },
            body: JSON.stringify({
                'bodyParam1': 'this is the first param',
                'bodyParam2': 'this is the second param'
            })
        })
            .then((response) => {
                return response.text();
            })
            .then((response) => {
                resolve(resolve({
                    type: 'success',
                    response
                }));
            })
            .catch((error) => {
                console.log({ error });
                reject({
                    type: 'failure',
                    error: error.message
                });
            })
    });
}
