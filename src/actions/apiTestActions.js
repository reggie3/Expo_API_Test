let apiTestActions ={

    post: function(auth){
        return {
            type: 'POST',
            auth
        }
    },
    get: function(auth){
        return {
            type: 'get',
            auth
        }
    },
    put: function(auth){
        return {
            type: 'put',
            auth
        }
    },
    delete: function(auth){
        return {
            type: 'delete',
            auth
        }
    }
}
export default apiTestActions;