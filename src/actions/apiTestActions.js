import * as apiTestUtils from '../apiTestUtils'

let apiTestActions = {

    doPost: function (service, userInfo) {
        return {
            type: 'POST',
            payload: apiTestUtils.doPost(service, userInfo)
        }
    },
    doGet: function (service, userInfo) {
        return {
            type: 'GET',
            payload: apiTestUtils.doGet(service, userInfo)
        }
    },
    doPut: function (service, userInfo) {
        return {
            type: 'PUT',
            payload: apiTestUtils.doPut(service, userInfo)
        }
    },
    doDelete: function (service, userInfo) {
        return {
            type: 'DELETE',
            payload: apiTestUtils.doDelete(service, userInfo)
        }
    }
}
export default apiTestActions;