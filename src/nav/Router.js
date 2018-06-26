import React from "react";
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import List from "../screens/List";
import UserProfile from "../screens/UserProfile";
import Login from "../screens/Login";


export const SignedIn = createBottomTabNavigator(
    {
        TimeLine: {screen: List},
        Profile: {screen: UserProfile}
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


