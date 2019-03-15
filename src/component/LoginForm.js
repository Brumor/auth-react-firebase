import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase'
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      isLoading: false
    };
    this.onButtonPress =  this.onButtonPress.bind(this)
    this.renderButton =  this.renderButton.bind(this)
    this.onLoginSuccess =  this.onLoginSuccess.bind(this)
    this.onLoginFailed =  this.onLoginFailed.bind(this)
  }

  renderButton() {
    if (this.state.isLoading) {
      return <Spinner size="small" />
    } else {
      return (
        <Button onPress={this.onButtonPress.bind()}>
          Log In
        </Button >
      );
    }
  }

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({
      error: '',
      isLoading:  true
    })

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.onLoginSuccess)
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(this.onLoginFailed)
    })
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      isLoading: false,
      error: ''
    })
  }

  onLoginFailed() {
    this.setState({
      error: 'Authentication Failed.',
      isLoading: false
    });
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder='user@gmail.com'
            label='Email'
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
        </CardSection>


        <CardSection>
          <Input
            placeholder='password'
            label='Password'
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection >
      </Card >
    )
  }
}

const styles = {
  errorTextStyle : {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm;
