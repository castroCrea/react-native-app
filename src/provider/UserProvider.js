import {Component} from "react";
import {AsyncStorage} from "react-native";
import firebase from 'react-native-firebase';

export default class UserProvider extends Component {
    userLastPosition = {};

    async getUsers(numberOfCurrentUserPosition = 2) {
        const self = this;
        return await AsyncStorage.getItem("user").then(function (user) {
            const uid = JSON.parse(user).uid;
            console.log(uid);

            const rootRef = firebase.database().ref();
            const positionRef = rootRef.child("positions");
            console.log(positionRef);
            /** get the 3 last position of the current user */
            positionRef.orderByChild('filters').equalTo(uid).limitToLast(numberOfCurrentUserPosition).on("value", function(snapshot) {
                console.log(snapshot.toJSON());
                //TODO: get the user with the same filter 1 and 2
                //TODO: remove if the current user is on it
                //TODO: remove the logic if the user get child everyone if not only user with child
                //TODO: remove duplicated user
            });

        });
    }
}