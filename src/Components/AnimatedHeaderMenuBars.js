import React, { Component } from 'react';
import {
    StyleSheet, TouchableHighlight, Animated
} from 'react-native';
import { connect } from 'react-redux';
import actions from '../actions/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import globals from '../globals/globals';
import Expo from 'expo';
import * as Animatable from 'react-native-animatable';


class AnimatedHeaderMenuBars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(1),
        };
    }

    componentDidMount() {
        this.icon.bounceIn(500)
    }

    componentWillUnmount() {
        this.icon.fadeOut(500)
    }

    render() {
        return (
            <Animatable.View
                    ref={(component)=>this.icon = component}>
                <TouchableHighlight
                    style={styles.touchableStyle}
                    underlayColor='transparent'
                    onPress={this.props.onPress}>
                    <Icon
                        name='bars'
                        color={'white'}
                        size={this.props.size} />
                </TouchableHighlight>
            </Animatable.View>
        )
    }
}

export default Animatable.createAnimatableComponent(AnimatedHeaderMenuBars);

const styles = StyleSheet.create({
    touchableStyle: {
        marginHorizontal: 10
    },
});