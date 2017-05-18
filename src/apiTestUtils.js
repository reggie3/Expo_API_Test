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
const handleErrors = (responseStatus) => {
    switch (responseStatus) {
        case 500:
            return ({
                type: 'error',
                response: 'server error'
            });
        case 403:
            return ({
                type: 'error',
                response: 'access forbidden'
            });
        default:
            return ({
                type: 'error',
                response: 'unknown error'
            });
    }
}

const handleResponse = (response) => {
    // handleError returns a complete response with
    // with a type property already
    if (response.hasOwnProperty("type")) {
        return response;
    }
    return ({
        type: 'success',
        response
    })
}

export const doPost = (service, userInfo) => {
    return fetch(appSecrets.aws.apiURL, {
        method: 'POST',
        headers: {
            // changed the header name to Auth becuase authorizationToken wasn't working
            // for some reason even if the Custom Authorizer's Identiy token sources was 
            // set to method.request.header.authorizationToken
            'Auth': createAuthorizationString(service, userInfo)
        },
        body: JSON.stringify({
            'bodyParam1': 'this is the first param',
            'bodyParam2': 'this is the second param'
        })
    })
    .then((response) => {
        if (response.status !== 200) {
            debugger;
            return handleErrors(response.status);
        }
        else {
            return response.text();
        }
    })
    .then((response) => {
            debugger
            return handleResponse(response);
        })
        .catch(function (err) {   
            console.log("Error: ", err);
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
            return handleErrors(response.status);
            }
            else {
                return response.text();
            }
        })
        .then((response) => {
            return handleResponse(response);
        })
        .catch(function (err) {   
            console.log("error: ", err);
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
            return handleErrors(response.status);
            }
            else {
                return response.text();
            }
        })
        .then((response) => {
            return handleResponse(response);
        })
        .catch(function (err) {   
            console.log("error: ", err);
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
            return handleErrors(response.status);
            }
            else {
                return response.text();
            }
        })
        .then((response) => {
            return handleResponse(response);
        })
        .catch(function (err) {   
            console.log("error: ", err);
        })
}