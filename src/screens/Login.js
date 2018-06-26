import React, { Component } from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import User from "../model/User";
import firebase from 'react-native-firebase';

export default class Login extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Union
                </Text>
                <LoginButton
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                console.log("Login failed with error: " + error.message);
                            } else if (result.isCancelled) {
                                console.log("Login was cancelled");
                            } else {
                                AccessToken.getCurrentAccessToken().then((data) => {
                                    const { accessToken } = data;
                                    this.setContent(accessToken);
                                    this.props.navigation.navigate('App');
                                });
                            }
                        }
                    }
                    readPermissions={["public_profile email user_birthday user_gender user_photos"]}
                    onLogoutFinished={() =>
                        this.props.navigation.navigate('App')
                    }
                />
            </View>
        );
    }

    setContent(token) {
        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        // login with credential
        firebase.auth().signInAndRetrieveDataWithCredential(credential)
            .then(function (currentUser) {

                const uid = currentUser.user.toJSON().uid;

                //log into database
                let rootRef = firebase.database().ref();
                let usersRef = rootRef.child("users");
                let user = {};
                const date = Date.now();

                usersRef.child(uid).on('value', function(snapshot){
                    if (snapshot.toJSON() == null) {
                        user = new User(currentUser.additionalUserInfo.profile);
                        user.uid = uid;
                        user.dateOfLastConnection = date;
                        user.dateOfRegistration = date;
                        //set the new user in database
                        usersRef.child(uid).set(user.getUser());
                    } else {
                        usersRef.child(uid).child('dateOfLastConnection').set(date);
                        user = new User(snapshot.toJSON());
                    }
                    //Store user data in local Storage
                    AsyncStorage.setItem("user", user.getJson());
                    usersRef.child(uid).off();
                });
            });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
