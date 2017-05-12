import React, { Component } from 'react';
import { View, StyleSheet,  Platform } from 'react-native';
import globals from '../globals/globals';
import Expo from 'expo';
import * as Animatable from 'react-native-animatable';


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
class ScreenWrapper extends Component {
    constructor() {
        super();

        this.state = {
            screenName: ""
        }
    }

    componentDidMount() {
        this.wrapper.bounceIn(800);
    }

    componentWillUnmount() {
        this.wrapper.bounceOut(800);
    }

    render() {
        return (
            <Animatable.View
                style={styles.wrapper}
                ref={(component)=>this.wrapper = component}>
                {this.props.component}
            </Animatable.View>
        );
    }
}

export default Animatable.createAnimatableComponent(ScreenWrapper);


const styles = StyleSheet.create({
    wrapper: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'lightblue',
        flex: 1,
        justifyContent: 'center',
        top: Expo.Constants.statusBarHeight + globals.appBar.height.standard

    }
})