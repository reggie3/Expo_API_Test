
let appState ={
   
    navigateTo: (screen)=>{
        return{
            type: 'NAVIGATE_TO',
            screen
        }
    },
    navigateBack:()=>{
        return{
            type: 'NAVIGATE_BACK'
        }
    },


    
}
export default appState;