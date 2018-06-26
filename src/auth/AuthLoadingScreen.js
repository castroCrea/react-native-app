import React from 'react';
import {View, StatusBar, ActivityIndicator} from 'react-native';
import {AccessToken} from "react-native-fbsdk";

export class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        AccessToken.getCurrentAccessToken().then(
            (data) => {
                if (data) {
                    // This will switch to the App screen or Auth screen and this loading
                    this.props.navigation.navigate(data ? 'App' : 'Auth');
                }

            });
        // screen will be unmounted and thrown away.
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}