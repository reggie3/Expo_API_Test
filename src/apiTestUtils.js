import appSecrets from './appSecrets';


export const doPost = (service, userInfo) => {
    return new Promise(function (resolve, reject) {
        fetch(appSecrets.aws.apiURL, {
            method: 'POST',
            headers: {
                'authorizationToken': userInfo.accessToken
            },
            body:JSON.stringify({
                'bodyParam1': 'this is the first param',
                'bodyParam1': 'this is the second param'
            })
        })
            .then((response) => {
                debugger;
                return response.text();
            })
            .then((response) => {
                debugger
                resolve(resolve({
                    type: 'success',
                    response
                }));
            })
            .catch((error)=>{
                console.log({error});
                reject(error);
            })
    });
}
export const doGet = (service, userInfo) => {

}
export const doPut = (service, userInfo) => {

}

export const doDelete = (service, userInfo) => {

}
