import appSecrets from './appSecrets';

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
        body: JSON.stringify({
            'bodyParam1': `you sent me to the server, and now I'm back!`,
        })
    })
        .then((response) => {
            if (response.status !== 200) {
                // the handle errors function handles HTTP response error codes      
                let errorMessage = handleErrors(response.status);
                return errorMessage;
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

export const doGet = (service, userInfo) => {
    return fetch(appSecrets.aws.apiURL, {
        method: 'GET',
        /* 
        *** GET methods don't take a body parameter.  Uncommenting the lines below
        will cause an error ***/
        /*body: JSON.stringify({
            'bodyParam1': 'this is the first param',
            'bodyParam2': 'this is the second param'
        })*/
    })
        .then((response) => {
            if (response.status !== 200) {
                // the handle errors function handles HTTP response error codes      
                return handleErrors(response.status)
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
        body: JSON.stringify({
            'bodyParam1': 'this is the first param',
            'bodyParam2': 'this is the second param'
        })
    })
        .then((response) => {
            if (response.status !== 200) {
                // the handle errors function handles HTTP response error codes      
                return handleErrors(response.status)
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
        body: JSON.stringify({
            'bodyParam1': 'this is the first param',
            'bodyParam2': 'this is the second param'
        })
    })

        .then((response) => {
            if (response.status !== 200) {
                // the handle errors function handles HTTP response error codes      
                return handleErrors(response.status)
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
