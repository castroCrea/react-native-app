import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { set } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';

/**
 * Get basic data of the user
 */
export default class InitUser extends Component {

    constructor(token) {
        super(token);
        return InitUser.setContent(token);
    }

    /** Firebase register the facebook user and send back the user data */
    static async setContent(token) {
        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        // login with credential
        await firebase.auth().signInAndRetrieveDataWithCredential(credential)
            .then(function (currentUser) {
                AsyncStorage.setItem("user.uid", currentUser.user.toJSON().uid);
                return currentUser.user.toJSON();
            });
    }
}