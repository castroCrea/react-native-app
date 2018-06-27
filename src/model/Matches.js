import React, { Component } from 'react';

export default class Matches extends Component {
    uid = '';
    firstUserId = '';
    secondUserId = '';
    reverse = false;
    blocked = '';
    blockedFromUserId = '';
    dateOfFirstLike = '';
    dateOfFirstMatches = '';

    constructor(data) {
        super(data);
        Object.assign(this, data);
    }

    getMatches() {
        return {
            'uid': this.uid,
            'firstUserId': this.firstUserId,
            'secondUserId': this.secondUserId,
            'reverse': this.reverse,
            'blocked': this.blocked,
            'blockedFromUserId': this.blockedFromUserId,
            'dateOfFirstLike': this.dateOfFirstLike,
            'dateOfFirstMatches': this.dateOfFirstMatches,
        }
    }

    getJson() {
        return JSON.stringify(this.getMatches());
    }
}