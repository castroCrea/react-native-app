import React, { Component } from 'react';
import {View, Button, StyleSheet, ScrollView} from 'react-native';

export default class List extends Component {

    render() {
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
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
