import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Button, Platform, TouchableHighlight, Animated
} from 'react-native';
import { connect } from 'react-redux';
import actions from '../actions/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import globals from '../globals/globals';
import Expo from 'expo';
import AnimatedHeaderArrow from './AnimatedHeaderArrow';
import AnimatedHeaderMenuBars from './AnimatedHeaderMenuBars';
import * as Animatable from 'react-native-animatable';
import AnimatedHeaderProfilePicture from './AnimatedHeaderProfilePicture';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const HEADER_ICON_SIZE = 30;

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerIconToDisplay: 'menu'
        };
    }
    onArrowPressed() {
        this.setState({ headerIconToDisplay: 'menu' });
        //this.props.dispatch(actions.appStateActions.toggleSideDrawer(false));
        this.props.dispatch(actions.modalsActions.showMainMenu(false));
    }
    onMenuPressed() {
        this.setState({ headerIconToDisplay: 'arrow' });
        //this.props.dispatch(actions.appStateActions.toggleSideDrawer(true));
        this.props.dispatch(actions.modalsActions.showMainMenu(true));
    }

    componentDidMount() {
        this.header.bounceInDown(500)
    }

    componentWillUnmount() {
        this.header.bounceOutUp(500)
    }



    render() {
        let menuIcon = <AnimatedHeaderMenuBars
            size={HEADER_ICON_SIZE}
            onPress={this.onMenuPressed.bind(this)}
            ref="menuBarsIcon" />

        if (this.props.showMainMenu) {
            menuIcon = <AnimatedHeaderArrow
                size={HEADER_ICON_SIZE}
                onPress={this.onArrowPressed.bind(this)}
                ref="arrowIcon" />
        };

        let profilePicture = (<View style={styles.profilePicturePlaceHolder} />);
        if (this.props.profilePicture) {
            profilePicture = <AnimatedHeaderProfilePicture />
        }

        return (
            <Animatable.View
                style={styles.header}
                ref={(component) => this.header = component}>
                    <View style={styles.headerContainer}>
                        {menuIcon}
                        <Text style={styles.headerText}>
                            {this.props.navigation.screenName ? this.props.navigation.screenName : "API Testing"}
                        </Text>
                        {profilePicture}
                    </View>
            </Animatable.View>
        )
    }
}

const mapStateToProps = (state) => {
    return Object.assign({}, {
        navigation: state.appState.navigation,
        showMainMenu: state.modals.showMainMenu,
        profilePicture: state.authentication.userInfo.profilePicture

    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
}

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
export default Header;

const headerTextColor = 'rgba(255,255,255,1)';
const headerBackgroundColor =' rgba(50,50,75,1)';

const styles = StyleSheet.create({
    header: {
        top: Expo.Constants.statusBarHeight,
        width: '100%',
        height: globals.appBar.height.standard,
        backgroundColor: headerBackgroundColor,
        borderBottomColor: 'rgba(150,150,200,1)',
        borderBottomWidth: 1,
        borderTopColor: 'rgba(150,150,200,1)',
        borderTopWidth: 1
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        //backgroundColor: 'rgba(255, 255, 255, .5)',
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    touchableStyle: {
        marginRight: 10
    },
    headerText: {
        fontSize: 20,
        marginHorizontal: 10,
        color: headerTextColor
    },
    profilePicturePlaceHolder: {
        width: 42,
        height: 42,
        
        
    }

});