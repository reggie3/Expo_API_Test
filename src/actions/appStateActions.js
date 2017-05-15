import * as storageUtils from '../storageUtils';

let appState = {

    navigateTo: (screen) => {
        return {
            type: 'NAVIGATE_TO',
            screen
        }
    },
    navigateBack: () => {
        return {
            type: 'NAVIGATE_BACK'
        }
    },
    // this function takes the newly created storage object and saves it to the redux store
    saveStorage: (storage) => {
        
        return {
            type: 'SAVE_STORAGE',
            storage
        }
    },

}
export default appState;