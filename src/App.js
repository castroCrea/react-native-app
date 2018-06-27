import React, { Component } from 'react';
import { SignedIn, SignedOut } from './nav/Router';
import { AccessToken } from 'react-native-fbsdk';
import UserPosition from './model/UserPosition';

type Props = {};

export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false
        };

    }

    componentDidMount() {
        AccessToken.getCurrentAccessToken().then(
            (data) => {
                if (data) {
                    this.setState({signedIn: true});
                    this.props.navigator.navigate('TimeLine');
                    console.log('mlk');
                    new UserPosition();

                }

            });
    }

    render() {
        const { signedIn } = this.state;

        if (signedIn) {
            return <SignedIn />;
        } else {
            return <SignedOut />;
        }
    }
}
