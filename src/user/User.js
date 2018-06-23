import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

/**
 * Get basic data of the user
 */
export default class User extends Component {
    registerAction(){
        AsyncStorage.getItem("user.uid").then(function (uid) {
            console.log(uid);
            firebase.database().ref('user/'+uid+'/action').set('helloWorld');
        })
    }
}