import React from 'react'

type GoogleAuthPropsType = unknown
type GoogleAuthState = {
    isSignedIn: boolean
}

class GoogleAuth extends React.Component<GoogleAuthPropsType, GoogleAuthState> {
    auth: gapi.auth2.GoogleAuth | null = null

    state = {
        isSignedIn: false
    }

    async componentDidMount() {
        console.log(process.env.REACT_APP_OAUTH_CLIENT_ID)
        window.gapi.load('client:auth2', () => {
            window.gapi.client
                .init({
                    clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
                    scope: 'email'
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance()
                    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                })
        })
    }

    renderAuthButton(): JSX.Element {
        if (this.state.isSignedIn) {
            return <div>I am signed in.</div>
        } else {
            return <div>I am not signed in</div>
        }
    }

    render(): JSX.Element {
        return (
            <div>
                <p>Google Auth</p>
                {this.renderAuthButton()}
            </div>
        )
    }
}

export default GoogleAuth
