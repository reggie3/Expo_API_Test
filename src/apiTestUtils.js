import appSecrets from './appSecrets';

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
    /*
    https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    The Promise returned from fetch() won’t reject on 
    HTTP error status even if the response is an HTTP 404 or 500. 
    Instead, it will resolve normally (with ok status set to false), 
    and it will only reject on network failure or if anything prevented 
    the request from completing.
    */
    return fetch(appSecrets.aws.apiURL, {
        method: 'POST',
        headers: {
            'authorizationToken': userInfo.accessToken
        },
        body: JSON.stringify({
            'bodyParam1': `you sent me to the server, and now I'm back`,
        })
    })
        .then((response) => {
            return response.text();
        })
        .then((response) => {
            if (response.status !== 200) {
                // the handle errors function handles HTTP response error codes      
                handleErrors(response.status, resolve)
            }
            else {
                return ({
                    type: 'success',
                    response
                })
            }
        })
        .catch((error) => {
            console.log({ error });
            return ({
                type: 'failure',
                error: error.message
            });
        });
}
export const doGet = (service, userInfo) => {
    return fetch(appSecrets.aws.apiURL, {
        method: 'GET',
        headers: {
            'authorizationToken': userInfo.accessToken
        },
        /* 
        *** GET methods don't take a body parameter.  Uncommenting the lines below
        will cause an error ***/
        body: JSON.stringify({
            'bodyParam1': 'this is the first param',
            'bodyParam2': 'this is the second param'
        })
    })
        .then((response) => {
            return response.text();
        })
        .then((response) => {
            if (response.status !== 200) {
                // the handle errors function handles HTTP response error codes      
                handleErrors(response.status, resolve)
            }
            else {
                return ({
                    type: 'success',
                    response
                })
            }
        })
        .catch((error) => {
            console.log({ error });
            return ({
                type: 'failure',
                error: error
            });
        });
}
export const doPut = (service, userInfo) => {
    return fetch(appSecrets.aws.apiURL, {
        method: 'PUT',
        headers: {
            'authorizationToken': userInfo.accessToken
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
            if (response.status !== 200) {
                // the handle errors function handles HTTP response error codes      
                handleErrors(response.status, resolve)
            }
            else {
                return ({
                    type: 'success',
                    response
                })
            }
        })
        .catch((error) => {
            console.log({ error });
            return ({
                type: 'failure',
                error: error
            });
        })
}

export const doDelete = (service, userInfo) => {
    return fetch(appSecrets.aws.apiURL, {
        method: 'DELETE',
        headers: {
            'authorizationToken': userInfo.accessToken
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
            if (response.status !== 200) {
                // the handle errors function handles HTTP response error codes      
                handleErrors(response.status, resolve)
            }
            else {
                return ({
                    type: 'success',
                    response
                })
            }
        })
        .catch((error) => {
            console.log({ error });
            return ({
                type: 'failure',
                error: error.message
            });
        });
}
