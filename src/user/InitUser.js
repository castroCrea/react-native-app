import React, { Component } from 'react';
import { set } from 'react-native-fbsdk';

/**
 * Get basic data of the user
 */
export default class InitUser extends Component {

    init(token) {
        let user = {};
        /** We call the graph api of facebook to get his data thanks to the token given on login user */
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + token)
        .then((response) => {
            response.json().then(function(json) {
                // Some user object has been set up somewhere, build that user here
                user.name = json.name;
                user.id = json.id;
                user.email = json.email;
                user.username = json.name;
                user.loading = false;
                user.loggedIn = true;
            })
        })
        .catch(() => {
            reject('ERROR GETTING DATA FROM FACEBOOK')
        });
        return user;
    }
}