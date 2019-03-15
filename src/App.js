import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './component/common';
import LoginForm from './component/LoginForm';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: null
    }
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyD_HwCch7mawn6j8czt1e5StdQmQ_ELpBw",
      authDomain: "authentification-d60f7.firebaseapp.com",
      databaseURL: "https://authentification-d60f7.firebaseio.com",
      projectId: "authentification-d60f7",
      storageBucket: "authentification-d60f7.appspot.com",
      messagingSenderId: "853335047701"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    });
  }

  renderContent() {

    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />
    }
  }

  render () {
    return (
      <View style={{flex:1, backgroundColor: '#FFF'}}>
        <Header headerText='Authentification' />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
