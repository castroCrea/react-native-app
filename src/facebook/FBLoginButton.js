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
                                alert("Login failed with error: " + error.message);
                            } else if (result.isCancelled) {
                                alert("Login was cancelled");
                            } else {
                                AccessToken.getCurrentAccessToken().then((data) => {
                                    const { accessToken } = data;
                                    console.log(accessToken);
                                    const initUserObject = new InitUser();
                                    const user = initUserObject.init(accessToken);
                                    console.log(user);
                                });
                            }
                        }
                    }
                    readPermissions={["public_profile email"]}
                    onLogoutFinished={() => alert("User logged out")}/>
            </View>
        );
    }
};

module.exports = FBLoginButton;