import React, { Component } from 'react';
import { StyleSheet, View, BackAndroid, } from 'react-native';
import { Provider } from 'react-redux'
import { store } from '../redux/store';
import { connect } from 'react-redux';
import actions from '../actions/actions';
import PendingModal from '../Components/PendingModal';
import ErrorModal from '../Components/ErrorModal';
import SuccessModal from '../Components/SuccessModal';
import appSecrets from '../appSecrets';
import screens from './screens';
import Header from '../Components/Header';
import renderIf from 'render-if';
import MainMenu from '../Components/MainMenu';

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
            appIsReady: false
        };
    }

    componentWillMount() {
        // initialize application
        this.initApplication();

    }

    initApplication() {
        this.addBackButtonListener();
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
        console.log("unmounting App");
    }

    render() {
        console.log("Show main menu:" + this.props.showMainMenu);
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
        showMainMenu: state.modals.showMainMenu


    });
}

const App = connectWithStore(store, AppComponent, mapStateToProps);
export default App;
