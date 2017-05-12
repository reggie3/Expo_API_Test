import React from 'react';
import ApiTesting from './ApiTesting';
import ScreenWrapper from './ScreenWrapper';

const screens = {
    
    ApiTesting: { screen: <ApiTesting />, name: "API Testing" }
};

// this object will hold the screens wrapped inside our animiatable component
let wrappedScreens = {};

Object.keys(screens).forEach((screenName, index) => {
    wrappedScreens[screenName] = {
        screen: <ScreenWrapper
            key={index}
            component={screens[screenName].screen}
            screenName={screenName}
            screenName={screens[screenName].hasOwnProperty("name") ?
                screens[screenName].name : undefined} />
    }
});

export default wrappedScreens;