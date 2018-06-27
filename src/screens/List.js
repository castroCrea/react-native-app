import React, { Component } from 'react';
import {View, Button, StyleSheet, ScrollView, WebView} from 'react-native';
import { LoginButton } from 'react-native-fbsdk';
import UserPosition from "../model/UserPosition";
import { styles } from "../styles/styles";
import UserProvider from "../provider/UserProvider";

export default class List extends Component {

    constructor(props){
        super(props);
        const u = new UserProvider();
        u.getUsers();
    }

    render() {
        new UserPosition();
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView style={{flex:2}}>
                    <Button
                        style={styles.container}
                        title="Go to Jane's profile"
                        onPress={() =>
                            navigate('Profile', { name: 'Jane' })
                        }
                    />
                    <LoginButton />
                </ScrollView>
                /** Cron job done on webView, then we don't need any other dependencies */
                <WebView
                    ref={'myWebView'}
                    source={{html: '<html><body></body></html>'}}
                    injectedJavaScript={this.runJSInBackground()}
                    javaScriptEnabledAndroid={true}
                >
                </WebView>
            </View>
        );
    }
    /** Cron job done on webView, that set user Position every 15 minutes, event when the app is in background, with that we don't need any other dependencies */
    runJSInBackground () {
        setInterval(function () {
            new UserPosition();
            console.log('flash');
        }, 300000);
    }
}
