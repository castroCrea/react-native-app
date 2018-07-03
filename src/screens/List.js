import React, { Component } from 'react';
import {
    View,
    Button,
    ListView,
    ScrollView,
    WebView,
    ActivityIndicator,
    Text,
    AsyncStorage,
    Image
} from 'react-native';
import { LoginButton } from 'react-native-fbsdk';
import UserPosition from "../model/UserPosition";
import { styles } from "../styles/styles";
import firebase from 'react-native-firebase';

const positionRef = firebase.firestore().collection('positions');


export default class List extends Component {

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
        let self =this;
        AsyncStorage.getItem("user").then(function (user) {
            const userStorage = JSON.parse(user);
            AsyncStorage.getItem("filters").then(function (filters) {
                const filtersStorage = (JSON.parse(filters) == null) ? [] : JSON.parse(filters);

                /** All user that the current user have cross */
                const crossUserList = [];
                const uid = userStorage.uid;
                const interestedBy = userStorage.interestedBy;
                filtersStorage.forEach(function (filter) {
                    positionRef
                        .where("gender", "==", interestedBy)
                        .where("filter", "==", filter)
                        .where("userId", "!=", uid)
                        .onSnapshot(querySnapshot => {
                            let i = 1;
                            querySnapshot.forEach(function(doc) {
                                (i > 10) ? resolve(crossUserList) : i++;
                                let crossUserUid = doc.data().userId;
                                if (typeof crossUserList[crossUserUid] === 'undefined') {
                                    crossUserList.push(doc.data());
                                }
                            });

                            self.setState({
                                isLoading: false,
                                dataSource: self.state.dataSource.cloneWithRows(crossUserList)
                            });
                        })
                });
            });
        });
    }



    renderRow(rowData) {
        return (
            <View>
                <Image
                    style={{width: 66, height: 58}}
                    source={{uri: 'https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_1280.jpg'}}
                />
                <Text>
                    {rowData.name}
                </Text>
                <Text>
                    {rowData.userId}
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

                <ScrollView style={{flex:5}}>

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

                    /** Cron job done on webView, then we don't need any other dependencies */
                    <WebView
                        style={{display: 0}}
                        ref={'myWebView'}
                        source={{html: '<html><body></body></html>'}}
                        injectedJavaScript={this.runJSInBackground()}
                        javaScriptEnabledAndroid={true}
                    >
                    </WebView>
                </ScrollView>
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
