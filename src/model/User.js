import React, { Component } from 'react';

export default class User extends Component {
    uid = '';
    id = '';
    first_name = '';
    email = '';
    birthday = '';
    gender = '';
    nbOfKids = '';
    interestedBy = '';
    dateOfRegistration = '';
    dateOfLastConnection = '';
    picture = '';

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
            'nbOfKids': this.nbOfKids,
            'interestedBy': this.getInterestedBy(),
            'dateOfRegistration': this.dateOfRegistration,
            'dateOfLastConnection': this.dateOfLastConnection,
            'picture': this.picture,
        }
    }

    /**
     * get the default interested By (opposite to the current sex get in facebook)
     * @returns {string}
     */
    getInterestedBy(){
        if ('' === this.interestedBy) {
            if (this.gender === 'male') {
                return 'female';
            } else {
                return 'male';
            }
        }
    }

    getJson() {
        return JSON.stringify(this.getUser());
    }
}