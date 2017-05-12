import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, Modal, TouchableHighlight } from 'react-native';
import { globalStyles } from '../globals/styles';
import { connect } from 'react-redux';
import actions from '../actions/actions';
import Hr from 'react-native-hr';
import * as Animatable from 'react-native-animatable';
import globals from '../globals/globals';
import Expo from 'expo';

class MainMenuComponent extends Component {

constructor(props) {
    super(props);
    this.state = {
      animationType: 'slideInRight'
    };
  }
  
    closeMenu() {
        this.props.dispatch(actions.modalsActions.showMainMenu(false));
    }

    signIn() {
        this.closeMenu();
        this.props.dispatch(actions.appStateActions.navigateTo("SignInSignUp"));
    }

    signOut() {
        this.closeMenu();
        this.props.dispatch(actions.authenticationActions.signOutUser());
    }

    componentDidMount() {
        this.animatable.bounceIn(500)
        //debugger
    }

    componentWillUnmount() {
        this.animatable.fadeOut(500)
        //debugger
    }

    render() {

        let signInRenderable = (
            <Button
                onPress={this.signIn.bind(this)}
                title="Sign In"
                accessibilityLabel="SignIn"
            />)
        if (this.props.authentication.signedIn) {
            signInRenderable = (
                <Button
                    onPress={this.signOut.bind(this)}
                    title="Sign Out"
                    accessibilityLabel="Sign Out"
                />)
        }
        return (
           <Animatable.View 
                style={styles.animatiableFill}
                ref={(component)=>this.animatable = component}
                 onPress={this.closeMenu.bind(this)}>
               
                <TouchableHighlight
                    style={styles.touchableBackground}
                    onPress={this.closeMenu.bind(this)}>
                    <View style={styles.modalMessageOverlay}>
                        <Text style={styles.modalMessageTitle}>Main Menu</Text>
                        <Hr lineColor='#b3b3b3' />
                        <View style={[styles.footerButtonContainer, styles.modalButtonContainer]}>
                            <View style={styles.buttonPadder}>
                                {signInRenderable}
                            </View>
                            <View style={styles.buttonPadder}>
                                <Button
                                    onPress={this.closeMenu.bind(this)}
                                    title="Settings"
                                    accessibilityLabel="Close this success dialog"
                                    color='limegreen'
                                />
                            </View>
                           
                        </View>
                        <Hr lineColor='#b3b3b3' />
                    </View>
                </TouchableHighlight>
            </Animatable.View>

        )
    }
}

const mapStateToProps = (state) => {
    return Object.assign({}, {
        showMainMenu: state.modals.showMainMenu,
        authentication: state.authentication
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
}

const MainMenuAnimatiable = Animatable.createAnimatableComponent(MainMenuComponent);
export default MainMenu = connect(mapStateToProps, mapDispatchToProps)(MainMenuAnimatiable);
// export default Animatable.createAnimatableComponent(MainMenu);

const styles = StyleSheet.create(Object.assign({}, globalStyles, {
    animatiableFill:{
                top: Expo.Constants.statusBarHeight + globals.appBar.height.standard,

        ...StyleSheet.absoluteFillObject,

    },
    touchableBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(200, 200, 200, .5)',
        //flex: 1,
        justifyContent: 'center',
        top: Expo.Constants.statusBarHeight + globals.appBar.height.standard,
        //top: globals.appBar.height.standard,
        bottom: 0
        
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    menuItemContainer:{
        
    }
}
));