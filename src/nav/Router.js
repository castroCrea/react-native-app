import React from "react";
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import List from "../screens/List";
import UserProfile from "../screens/UserProfile";
import Login from "../screens/Login";
import Icon from  "react-native-vector-icons/FontAwesome";


export const SignedIn = createBottomTabNavigator(
    {
        TimeLine: {
            screen: List,
            navigationOptions: {
                tabBarLabel: 'Feed',
                tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />
            }},
        Profile: {
            screen: UserProfile,
            navigationOptions: {
                tabBarLabel: 'Me',
                tabBarIcon: ({ tintColor }) => <Icon name="user-circle" size={30} color={tintColor} />
            },}
    },
    {
        tabBarPosition: 'bottom',
        swipeEnable: true,
        lazy: true
    }
);

export const SignedOut = createStackNavigator(
    {
        SignIn: {
            screen: Login
        },
        App: {
            screen: SignedIn
        }
    },
    {
        navigationOptions: {
            header: null,
        }
    }
    );


