import {Component} from "react";
import {AsyncStorage} from "react-native";
import {getCrossUser, getFilters} from '../query/ListQuery';

export default class UserProvider extends Component {
    getUsers(numberOfCurrentUserPosition = 4) {
        return new Promise(function (resolve, reject) {
            AsyncStorage.getItem("user").then(function (user) {
                const userStorage = JSON.parse(user);
                AsyncStorage.getItem("filters").then(function (filters) {
                    const filtersStorage = (JSON.parse(filters) == null) ? [] : JSON.parse(filters);
                    const crossUser = getCrossUser(filtersStorage, userStorage, numberOfCurrentUserPosition);
                    crossUser.then(
                        function (crossUser) {
                            resolve(crossUser);
                        }
                    ).catch(function () {
                        console.log('no result');
                    });
                });
            });
        });
    }
}