import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Modal } from 'react-native';
import { globalStyles } from '../globals/styles';


export default PendingModal = (props) => {

    let message = 'please wait';
    if(props.message){

    }
    return (
        <Modal
            animationType={"slide"}
            transparent={true}
            visible={props.visible}
            onRequestClose={() => { console.log("Modal has been closed.") }}>
            <View style={styles.modalBackground}>
            <View style={styles.modalMessageOverlay}>
                <ActivityIndicator
                    animating={true}
                    style={[styles.centering, { height: 180 }]}
                    size="large" />
                    <Text style={styles.modalMessageText}>{message}</Text>
            </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create(Object.assign({}, globalStyles, {

    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    }
}
));