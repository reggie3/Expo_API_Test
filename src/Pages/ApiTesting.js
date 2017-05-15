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
import Hr from 'react-native-hr';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const SignInInfo = t.struct({
  userName: t.String,
  password: t.String,
});
const formOptions = {
  fields: {
    userName: {
      placeholder: 'your user name',
      label: 'User Name'
    },
    password: {
      label: 'Password',
      secureTextEntry: true
    }
  }
};

class ApiTestingComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        //userName: "" + Math.floor(Math.random() * (max - min)) + min,
        userName: "test",
        password: "password",
      }
    };
  }

  signIn() {
    var signInInfo = this.refs.SignInForm.getValue();
    if (signInInfo) { // if validation fails, value will be null
      debugger
      this.props.dispatch(actions.authenticationActions.signInAuth0User(
        this.props.authentication.auth0,
        signInInfo));
    }
  }

  createAccount() {
    const newSignupInfo = this.refs.SignInForm.getValue();
    if (newSignupInfo) { // if validation fails, value will be null
      this.props.dispatch(actions.authenticationActions.signUpAuth0User(
        this.props.authentication.auth0,
        newSignupInfo))
    }
  }

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
    else {
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
    else {
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
    else {
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
        <Hr lineColor='#b3b3b3'/>
        <View style={{
          marginVertical: 10
        }}>
          <Form
            ref="SignInForm"
            type={SignInInfo}
            options={formOptions}
            style={{ alignSelf: 'flex-start', }}
            value={this.state.formValues}
          />
        </View>
        <View style={{
          justifyContent: 'flex-end',
          marginHorizontal: 20,
          paddingBottom: 25,
          flexDirection: 'column',
          bottom: 0,
          alignSelf: 'stretch',
        }}>
          <View style={{ paddingTop: 10 }}>
            <Button
              onPress={this.createAccount.bind(this)}
              title="Create Account"
              accessibilityLabel="Create a new account"
            />
          </View>
          <View style={{ paddingTop: 10 }}>
            <Button
              onPress={this.signIn.bind(this)}
              title="Sign In"
              color='limegreen'
              accessibilityLabel="Sign In to your account"
            />
          </View>
          <View style={{ paddingTop: 10 }}>
            <Button
              onPress={this.signIn.bind(this)}
              title="Forgot Password"
              accessibilityLabel="Forgot Password"
            />
          </View>
        </View>
        <Hr lineColor='#b3b3b3'/>
        <View style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row'
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