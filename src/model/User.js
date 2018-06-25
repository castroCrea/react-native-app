import React, { Component } from 'react';
import firebase from 'react-native-firebase';

export default class User extends Component {
    uid = '';
    id = '';
    first_name = '';
    email = '';
    birthday = '';
    gender = '';
    nbOfKid = '';
    interestedBy = '';
    dateOfRegistration = '';
    dateOfLastConnection = '';

    constructor(data) {
        super(data);
        Object.assign(this, data);
    }

    getUser() {
        return {
            'uid': this.uid,
            'id': this.id,
            'name': this.first_name,
            'email': this.email,
            'dateOfBirths': this.birthday,
            'gender': this.gender,
            'nbOfKid': this.nbOfKid,
            'interestedBy': this.interestedBy,
            'dateOfRegistration': this.dateOfRegistration,
            'dateOfLastConnection': this.dateOfLastConnection,
        }
    }

    getJson() {
        return JSON.stringify(this.getUser());
    }
}