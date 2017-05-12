import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, Modal, TouchableHighlight } from 'react-native';
import { globalStyles } from '../globals/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Hr from 'react-native-hr';


export default SuccessModal = (props) => {

    let message = 'success';
    if (props.message) {
        message = props.message
    }
    return (
        <Modal
            animationType={"slide"}
            transparent={true}
            visible={props.visible}
            onRequestClose={() => { console.log("Modal has been closed.") }}>
            <TouchableHighlight style={styles.modalBackground}
             onPress={props.setVisible}>
                <View style={styles.modalMessageOverlay}>
                    <Text style={styles.modalMessageTitle}>Success</Text>
                    <Hr lineColor='#b3b3b3' />
                    <Icon name="check-circle" color="white" size={75} />
                    <Text style={styles.modalMessageText}>{message}</Text>
                    <Hr lineColor='#b3b3b3' />
                    <View style={[styles.footerButtonContainer, styles.modalButtonContainer]}>
                        <View style={styles.buttonPadder}>
                            <Button
                                onPress={props.setVisible}
                                title="Close"
                                accessibilityLabel="Close this success dialog"
                                color='limegreen'
                            />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
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