import React, { Component } from 'react';
import { StyleSheet, View, BackAndroid, AppState } from 'react-native';
import { Provider } from 'react-redux'
import { store } from '../redux/store';
import { connect } from 'react-redux';
import actions from '../actions/actions';
import PendingModal from '../Components/PendingModal';
import ErrorModal from '../Components/ErrorModal';
import SuccessModal from '../Components/SuccessModal';
import Auth0 from 'react-native-auth0';
import appSecrets from '../appSecrets';
import screens from './screens';
import Header from '../Components/Header';
import renderIf from 'render-if';
import MainMenu from '../Components/MainMenu';
import * as storageUtils from '../storageUtils';

Provider.childContextTypes = {
    store: React.PropTypes.object,
    storeSubscription: React.PropTypes.object
}

class AppComponent extends Component {
    static navigationOptions: {
        header: {
            visible: false,
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            appIsReady: false,
            appState: AppState.currentState,
        };
    }

    componentWillMount() {
        // initialize application
        this.initApplication();

    }

    initApplication() {
        // add event listeners
        AppState.addEventListener('change', this.handleAppStateChange);
        AppState.addEventListener('memoryWarning', this.handleMemoryWarning);
        this.addBackButtonListener();

        // intialize the storage system
        let initedStorage = storageUtils.initStorage();
        this.props.dispatch(actions.appStateActions.saveStorage(initedStorage));

        // init Auth 0
        this.initAuthServices();
    }

    initAuthServices() {
        const auth0 = new Auth0(appSecrets.auth0.domain);
        this.props.dispatch(actions.authenticationActions.initAuth(auth0));
    }

    componentWillReceiveProps(nextProps) {
        // listen for when the appState changes and authentication storedAuthenticationChecked key
        // is false indicating that credentials haven't alredy been filled from storage
        if((nextProps.appState.storage !== this.props.appState.storage)&&(!this.props.authentication.storedAuthenticationChecked)){
            console.log('checking stored authentication') 
            this.props.dispatch(actions.authenticationActions.loadAuthenticationFromStorage(nextProps.appState.storage));
        }
    }

    addBackButtonListener() {
        const that = this;
        BackAndroid.addEventListener('hardwareBackPress', function () {
            if (that.props.appState.navigation.currentScreen !== 'Home') {
                that.props.dispatch(actions.appStateActions.navigateBack());
                return true;
            }
            return false;
        });
    }

    closeSuccessDialog() {
        this.props.dispatch(actions.modalsActions.closeSuccessDialog());
    }

    closeErrorDialog() {
        this.props.dispatch(actions.modalsActions.closeErrorDialog());
    }

    componentWillUnmount() {
        
        this.state.removeFunction.remove();
        AppState.removeEventListener('change', this.handleAppStateChange);
        AppState.removeEventListener('memoryWarning', this.handleMemoryWarning);
        console.log("unmounting App");
    }

    storeState(){
        // if the user is signed in, store their authentication information
        // otherwise remove any authentication information from the store
        if(this.props.authentication.signedIn){
            storageUtils.saveToStorage(this.props.appState.storage, 'authentication', this.props.authentication);
        }
        else{
            storageUtils.removeFromStorage(this.props.appState.storage, 'authentication');
        }
    }

    // handle app state changes.  Save some state to persistant storage
    //  everytime the app moves the the background
    handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
        }
        else if (this.state.appState === 'active' && nextAppState.match(/inactive|background/)) {
            console.log('App has gone to background!');
            // save stuff to storage
            this.storeState();
        }

        this.setState({ appState: nextAppState });
    }

    handleMemoryWarning = () => {
        this.setState({ memoryWarnings: this.state.memoryWarnings + 1 });
    };

    render() {
        return (
            <Provider store={store}>
                <View style={StyleSheet.absoluteFill}>
                    {screens[this.props.appState.navigation.currentScreen].screen}
                    <PendingModal
                        visible={this.props.showPendingDialog.open}
                        message={this.props.showPendingDialog.message}
                    />
                    <ErrorModal
                        visible={this.props.showErrorDialog.open}
                        message={this.props.showErrorDialog.message}
                        setVisible={this.closeErrorDialog.bind(this)}
                    />
                    <SuccessModal
                        visible={this.props.showSuccessDialog.open}
                        message={this.props.showSuccessDialog.message}
                        setVisible={this.closeSuccessDialog.bind(this)}
                    />
                    <Header />
                    {
                        renderIf(this.props.showMainMenu === true)(
                            <MainMenu />
                        )
                    }
                </View>
            </Provider>
        )
    }
}

function connectWithStore(store, WrappedComponent, ...args) {
    var ConnectedWrappedComponent = connect(...args)(WrappedComponent)
    return function (props) {
        return <ConnectedWrappedComponent {...props} store={store} />
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
}
const mapStateToProps = (state) => {
    return Object.assign({}, {
        appState: state.appState,
        showPendingDialog: state.modals.showPendingDialog,
        showErrorDialog: state.modals.showErrorDialog,
        showSuccessDialog: state.modals.showSuccessDialog,
        sideDrawer: state.appState.sideDrawer,
        showMainMenu: state.modals.showMainMenu,
        authentication: state.authentication
    });
}

const App = connectWithStore(store, AppComponent, mapStateToProps);
export default App;
