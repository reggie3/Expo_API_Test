import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '../globals/styles';

const iconName = 'facebook';
export default FaceBookSignInButton = (props) => {
    let renderable = (
        <TouchableHighlight
            underlayColor='#99d9f4'
            onPress={props.onPress}>
            <View style={styles.buttonContainer}>
                <Icon name={iconName} color="white" size={25} />
                <Text style={styles.btnText}>Sign In with Facebook</Text>
            </View>
        </TouchableHighlight>
    )
    if (props.type === 'small') {
        renderable = (
            <TouchableHighlight
                underlayColor='#99d9f4'
                onPress={props.onPress}>
                <View style={styles.buttonContainerSmall}>
                    <Icon name={iconName} color="white" size={25} />
                </View>
            </TouchableHighlight>
        )
    }

    return renderable
}
const backgroundColor = "#3b5998";
const styles = StyleSheet.create(Object.assign({}, globalStyles, {
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor,
        paddingVertical: 7,
        paddingHorizontal: 7,
        borderRadius: 5,
        justifyContent: 'center'
    },
    buttonContainerSmall: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
        paddingVertical: 7,
        paddingHorizontal: 7,
        borderRadius: 5,
        width: 48,
        height: 48,
    },
    btnText: {
        fontSize: 18,
        color: '#FAFAFA',
        marginLeft: 10,
        marginTop: 2,
    }
}));