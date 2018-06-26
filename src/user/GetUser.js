import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

/**
 * Get basic data of the user
 */
export default class GetUser extends Component {
    registerAction(){
        AsyncStorage.getItem("user").then(function (user) {
            console.log(user);
            console.log(firebase.database().getServerTime());

        })
    }
}