import React, { Component } from 'react';
import {
    View,
    Button,
    ListView,
    ScrollView,
    WebView,
    ActivityIndicator,
    Text
} from 'react-native';
import { LoginButton } from 'react-native-fbsdk';
import UserPosition from "../model/UserPosition";
import { styles } from "../styles/styles";
import { getUsers } from "../provider/UserProvider";


export default class List_with_facto_doesnT_work extends Component {

    constructor(props){
        super(props);
        new UserPosition();
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            isLoading: true,
            dataSource: dataSource
        };
    }


    componentDidMount() {
        const self = this;
        getUsers().done(
            function (crossUser) {
                console.log(crossUser);
                self.setState({
                    isLoading: false,
                    dataSource: self.state.dataSource.cloneWithRows(crossUser)
                });
            });
    }



    renderRow(rowData) {
        return (
            <View>
                <Text>
                    {rowData.name}
                </Text>
                <Text>
                    {rowData._key}
                </Text>
            </View>
        )
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.container}>

                <ScrollView style={{flex:1}}>

                    <View style={{flex:1}}>
                        <ListView  style={{flex:1}}
                                   enableEmptySections={true}
                                   dataSource={this.state.dataSource}
                                   renderRow={(rowData) => this.renderRow(rowData)}/>
                        </View>
                    <Button
                        style={styles.container}
                        title="Go to Jane's profile"
                        onPress={() => {
                               console.log('ml');
                            }
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
        }, 1800000);
    }
}
