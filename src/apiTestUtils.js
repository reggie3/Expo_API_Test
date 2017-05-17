import appSecrets from './appSecrets';

const createAuthorizationString = (service, userInfo) => {
    // either make sure this string is on one line or strip out characters that are
    // not allowed in http headers by some APIs
    let authString = `${service}||${userInfo.accessToken}||${userInfo.id}||${userInfo.email}`;
    return authString;
}

/***************************
 * handle error responses to requests.  successful request return a response to the calling promise
 */
const handleErrors = (responseStatus, resolve) => {
    switch (responseStatus) {
        case 500:
            resolve({
                responseType: 'error',
                responseMessage: 'server error'
            });
        case 403:
            resolve({
                responseType: 'error',
                responseMessage: 'access forbidden'
            });
        default:
            resolve({
                responseType: 'error',
                responseMessage: 'unknown error'
            });
    }
}

export const doPost = (service, userInfo) => {
    return fetch(appSecrets.aws.apiURL, {
        method: 'POST',
        headers: {
            // only items in the header that is identified as the 
            // "Identity Token Source" will make it through the API Gateway
            // to the authorizer.  createAuthorizationString builds a '||'
            // delineated string of the data that will be sent to the authorizer
            'Auth': createAuthorizationString(service, userInfo)
        },
        body: JSON.stringify({
            'bodyParam1': 'this is the first param',
            'bodyParam2': 'this is the second param'
        })
    })
    .then((response) => {
        if (response.status !== 200) {
            handleErrors(response.status, resolve)
        }
        else {
            return response.text();
        }
    })
    .then((text) => {
        return ({
            responseType: 'success',
            responseMessage: text
        });
    })

}
export const doGet = (service, userInfo) => {
    return fetch(appSecrets.aws.apiURL, {
        method: 'GET',
        headers: {
            'Auth': createAuthorizationString(service, userInfo)
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
        if (response.status !== 200) {
            handleErrors(response.status, resolve)
        }
        else {
            return response.text();
        }
    })
    .then((text) => {
        resolve({
            responseType: 'success',
            responseMessage: text
        });
    })

}
export const doPut = (service, userInfo) => {
    return fetch(appSecrets.aws.apiURL, {
        method: 'PUT',
        headers: {
            'Auth': createAuthorizationString(service, userInfo)
        },
        body: JSON.stringify({
            'bodyParam1': 'this is the first param',
            'bodyParam2': 'this is the second param'
        })
    })
    .then((response) => {
        if (response.status !== 200) {
            handleErrors(response.status, resolve)
        }
        else {
            return response.text();
        }
    })
    .then((response) => {
        resolve(resolve({
            responseType: 'success',
            responseMessage: response
        }));
    })
}

export const doDelete = (service, userInfo) => {
    return fetch(appSecrets.aws.apiURL, {
        method: 'DELETE',
        headers: {
            'Auth': createAuthorizationString(service, userInfo)
        },
        body: JSON.stringify({
            'bodyParam1': 'this is the first param',
            'bodyParam2': 'this is the second param'
        })
    })
    .then((response) => {
        if (response.status !== 200) {
            handleErrors(response.status, resolve)
        }
        else {
            return response.text();
        }
    })
    .then((response) => {
        resolve(resolve({
            responseType: 'success',
            responseMessage: response
        }));
    })
}
