import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, Button
} from 'react-native';
import { connect } from 'react-redux';
import { globalStyles } from '../globals/styles';
import actions from '../actions/actions';
import FaceBookSignInButton from '../Components/FacebookSignInButton';
import GoogleSignInButton from '../Components/GoogleSignInButton';

class ApiTestingComponent extends Component {

  signInSocial(social) {
    switch (social) {
      case 'facebook':
        this.props.dispatch(actions.authenticationActions.signInFacebook());
        break;
      case 'google':
        this.props.dispatch(actions.authenticationActions.signInGoogle());
        break;
    }
  }

  post() {
    //if (this.props.authentication.signedIn) {
      this.props.dispatch(actions.apiTestActions.doPost(
        this.props.authentication.type,
        this.props.authentication.userInfo
      ));
   /* }
    else{
      this.props.dispatch(actions.modalsActions.showErrorDialog(
        "error",
        "you must be signed in first"
      ))
    }*/
  }

  get() {
    if (this.props.authentication.signedIn) {
      this.props.dispatch(actions.apiTestActions.doGet(
        this.props.authentication.type,
        this.props.authentication.userInfo
      ));
    }
    else{
      this.props.dispatch(actions.modalsActions.showErrorDialog(
        "error",
        "you must be signed in first"
      ))
    }
  }

  put() {
    if (this.props.authentication.signedIn) {
      this.props.dispatch(actions.apiTestActions.doPut(
        this.props.authentication.type,
        this.props.authentication.userInfo
      ));
    }
    else{
      this.props.dispatch(actions.modalsActions.showErrorDialog(
        "error",
        "you must be signed in first"
      ))
    }
  }
  delete() {
    if (this.props.authentication.signedIn) {
      this.props.dispatch(actions.apiTestActions.doDelete(
        this.props.authentication.type,
        this.props.authentication.userInfo
      ));
    }
    else{
      this.props.dispatch(actions.modalsActions.showErrorDialog(
        "error",
        "you must be signed in first"
      ))
    }
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'white'
      }}>
        <View style={{
          flex: 1,
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <FaceBookSignInButton
            type='small'
            onPress={this.signInSocial.bind(this, 'facebook')} />
          <GoogleSignInButton
            type='small'
            onPress={this.signInSocial.bind(this, 'google')} />
        </View>
        <View style={{
          flex: 2,
          justifyContent: 'space-around',
        }}>
          <Button
            onPress={this.post.bind(this)}
            title="Post"
          />
          <Button
            onPress={this.get.bind(this)}
            title="Get"
          />
          <Button
            onPress={this.put.bind(this)}
            title="Put"
          />
          <Button
            onPress={this.delete.bind(this)}
            title="Delete"
            color="red"
          />
        </View>
        <View style={{
          flex: 3,
          backgroundColor: 'white',
          borderColor: 'lightblue',
          borderWidth: 1,
          padding: 5
        }}>
          <Text ref={(component) => { this.textbox = component }}>
            {this.props.responseMessage}
          </Text>
        </View>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return Object.assign({}, {
    authentication: state.authentication,
    responseMessage: state.appState.responseMessage

  });
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

const ApiTesting = connect(mapStateToProps, mapDispatchToProps)(ApiTestingComponent);
export default ApiTesting;