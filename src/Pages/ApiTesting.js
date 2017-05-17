import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, Button
} from 'react-native';
import { connect } from 'react-redux';
import { globalStyles } from '../globals/styles';
import actions from '../actions/actions';

class ApiTestingComponent extends Component {

  post() {
    this.props.dispatch(actions.apiTestActions.doPost(
      this.props.authentication.type,
      this.props.authentication.userInfo
    ));
  }
  get() {
    this.props.dispatch(actions.apiTestActions.doGet(
      this.props.authentication.type,
      this.props.authentication.userInfo
    ));

  }
  put() {
    this.props.dispatch(actions.apiTestActions.doPut(
      this.props.authentication.type,
      this.props.authentication.userInfo
    ));

  }
  delete() {
    this.props.dispatch(actions.apiTestActions.doDelete(
      this.props.authentication.type,
      this.props.authentication.userInfo
    ));

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