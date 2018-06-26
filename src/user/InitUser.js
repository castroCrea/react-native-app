import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { set } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import User from '../model/User';

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

                const uid = currentUser.user.toJSON().uid;

                //log into database
                let rootRef = firebase.database().ref();
                let usersRef = rootRef.child("users");
                let user = {};
                const date = Date.now();

                usersRef.child(uid).on('value', function(snapchot){
                    if (snapchot.toJSON() == null) {
                        user = new User(currentUser.additionalUserInfo.profile);
                        user.uid = uid;
                        user.dateOfLastConnection = date;
                        user.dateOfRegistration = date;
                        //set the new user in database
                        usersRef.child(uid).set(user.getUser());
                    } else {
                        usersRef.child(uid).child('dateOfLastConnection').set(date);
                        user = new User(snapchot.toJSON());
                    }
                    //Store user data in local Storage
                    AsyncStorage.setItem("user", user.getJson());
                    usersRef.child(uid).off();
                });

                return currentUser.user.toJSON();
            });
    }
}