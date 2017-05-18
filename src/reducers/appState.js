export default function appState(appState = {}, action) {
    switch (action.type) {

        case 'NAVIGATE_TO':
            return Object.assign({}, appState, {
                navigation:
                Object.assign({}, appState.navigation, {
                    currentScreen: action.screen,
                    screenStack: appState.navigation.screenStack.concat(action.screen),
                    screenName: action.screenName ? action.screenName : undefined
                })
            });
        case 'NAVIGATE_BACK':
            const screenStack = appState.navigation.screenStack;  // cache screenStack

            if (screenStack.length > 1) { // make sure there is something in the stack to go back towards
                // get the screen to go back to
                let backTarget = screenStack.slice(screenStack.length - 2)[0]; // get the string at index 0 since I want the string, not the array the string is in
                // get the remaining screens so that they can become the updated stack array
                let correctArray = screenStack.slice(0,
                    screenStack.length - 1);

                return Object.assign({}, appState, {
                    navigation:
                    Object.assign({}, appState.navigation, {
                        currentScreen: backTarget,
                        screenStack: correctArray
                    })
                });
            }
            return appState;

        case 'UPDATE_RESPONSE_MESSAGE':
            /**** 
             * could parse the response as shown below and use it for other purposes.
             * const response = JSON.parse(action.response);
             */
            debugger
            return Object.assign({}, appState, {
                responseMessage: action.responseMessage
            })

        case 'SAVE_STORAGE':
            return Object.assign({}, appState, {
                storage: action.storage
            })

        default:
            return appState;
    }
}