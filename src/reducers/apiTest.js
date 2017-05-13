export default function apiTest(apiTest = {}, action) {
    switch (action.type) {
        case 'POST_REJECTED':
            return apiTest;

        case 'GET_REJECTED':
            return apiTest;

        case 'PUT_REJECTED':
            return apiTest;

        case 'DELETE_REJECTED':
            return apiTest;

        case 'POST_FULFILLED':
            return apiTest;

        case 'GET_FULFILLED':
            return apiTest;

        case 'PUT_FULFILLED':
            return apiTest;

        case 'DELETE_FULFILLED':
            return apiTest;

        default:
            return apiTest;
    }
}