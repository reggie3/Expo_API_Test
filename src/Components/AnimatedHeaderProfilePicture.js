import React, { Component } from 'react';
import {
    StyleSheet, Image, TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import actions from '../actions/actions';
import * as Animatable from 'react-native-animatable';

const HEADER_ICON_SIZE = 42;

class AnimatedHeaderProfilePictureComponent extends Component {

    componentDidMount() {
        this.profilePicture.bounceIn(1500)
    }

    componentWillUnmount() {
        this.profilePicture.bounceOut(500)
    }


    render() {


        return (
            <Animatable.View
                ref={(component) => this.profilePicture = component}>
                <Image source={{ uri: this.props.profilePicture }}
                    style={styles.profilePicture} />
            </Animatable.View>
        )
    }
}

const mapStateToProps = (state) => {
    return Object.assign({}, {
        profilePicture: state.authentication.userInfo.profilePicture

    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
}

const AnimatedHeaderProfilePicture = connect(mapStateToProps, mapDispatchToProps)(AnimatedHeaderProfilePictureComponent);
export default AnimatedHeaderProfilePicture;

const styles = StyleSheet.create({

    profilePicture: {
        width: HEADER_ICON_SIZE,
        height: HEADER_ICON_SIZE,
        borderRadius: 4,
        borderColor: 'rgba(150,150,200,1)',
        borderWidth: 1,
    }

});