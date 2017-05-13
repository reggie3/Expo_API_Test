import appSecrets from './appSecrets';


export const doPost = (service, userInfo) => {
    return new Promise(function (resolve, reject) {
        fetch(appSecrets.aws.apiURL, {
            method: 'POST',
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
export const doGet = (service, userInfo) => {
    return new Promise(function (resolve, reject) {
        fetch(appSecrets.aws.apiURL, {
            method: 'GET',
            headers: {
                'authorizationToken': userInfo.accessToken
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
