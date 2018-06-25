import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import InitUser  from '../user/InitUser';

export default class FBLoginButton extends Component {
    render() {
        return (
            <View>
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
                                    new InitUser(accessToken);
                                });
                            }
                        }
                    }
                    readPermissions={["public_profile email user_birthday user_gender user_photos"]}
                    onLogoutFinished={() => alert("User logged out")}/>
            </View>
        );
    }
};

module.exports = FBLoginButton;