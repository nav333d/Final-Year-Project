import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

import AppNavigator from './src/navigation/AppNavigator';

class App extends Component{

  componentWillMount(){

    var firebaseConfig = {
        apiKey: "AIzaSyAtt9dmW-bDf3WEnmClzLhTgWkZAktCYQc",
        authDomain: "finaldb-b801a.firebaseapp.com",
        databaseURL: "https://finaldb-b801a.firebaseio.com",
        projectId: "finaldb-b801a",
        storageBucket: "finaldb-b801a.appspot.com",
        messagingSenderId: "737374005165",
        appId: "1:737374005165:web:54a00b01d3c03bf7"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig); 
    }

}

  render() {

    return (
        <AppNavigator />
    );

  }
}

export default App;