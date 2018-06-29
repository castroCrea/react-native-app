import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

export default class UserPosition extends Component {
    userId = '';
    name = '';
    picture = '';
    gender = '';
    positionLat = '';
    positionLong = '';
    dateOnPosition = '';
    nbOfKids = '';

    constructor(data) {
        super(data);
        Object.assign(this, data);
        /** Set current time for the user position */
        this.dateOnPosition = new Date();
        const positionRef = firebase.firestore().collection('positions');
        /** push to the firebase data base on positions document */
        this.setUserPosition().done(() => {
            this.setUserData().done(() => {
                /** create value for the filter */
                positionRef.add(this.getUserPosition());
            })
        });
    }
    /**
     * This function can wait that the request for the position is done before sending to firebase database
     * Set user position with the geoloc and basic datas to retrieve the data without going to the user each time
     */
    async setUserPosition(){
        const self = this;
        return await this.getCurrentLocation().then(function (position) {
            self.positionLat = parseFloat(position.coords.latitude).toFixed(3);
            self.positionLong = parseFloat(position.coords.longitude).toFixed(3);
        });
    }
    /** Create a function that get current Location */
    getCurrentLocation(options) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, ({code, message}) =>
                    reject(Object.assign(new Error(message), {name: "PositionError", code})),
                options);
        });
    };

    /** set basic user data form the locale storage */
    async setUserData(){
        const self = this;
        return await AsyncStorage.getItem("user").then(function (user) {
            const userJson = JSON.parse(user);
            self.userId = userJson.uid;
            self.name = userJson.name;
            self.picture = userJson.picture;
            self.gender = userJson.gender;
            self.nbOfKids = userJson.nbOfKids;

        })
    }
    /** create a formatted user position data */
    getUserPosition() {
        return {
            'userId': this.userId,
            'name': this.name,
            'picture': this.picture,
            'gender': this.gender,
            'positionLat': this.positionLat,
            'positionLong': this.positionLong,
            'dateOnPosition': this.dateOnPosition,
            'nbOfKids': this.nbOfKids
        }
    }
}