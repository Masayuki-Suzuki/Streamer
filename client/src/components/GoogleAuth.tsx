import React from 'react'
import { connect } from 'react-redux'
import { State } from '../types/state'
import { Nullable } from '../types/utilities'
import { signIn, signOut } from '../actions'

type GoogleAuthPropsType = {
    signIn: (userId: string) => void
    signOut: () => void
    isSignedIn: boolean
}
type GoogleAuthState = {
    isSignedIn: boolean
}

class GoogleAuth extends React.Component<GoogleAuthPropsType, GoogleAuthState> {
    auth: gapi.auth2.GoogleAuth | null = null

    state = {
        isSignedIn: false
    }

    componentDidMount(): void {
        window.gapi.load('client:auth2', () => {
            window.gapi.client
                .init({
                    clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
                    scope: 'email'
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance()
                    this.onAuthChange(this.auth.isSignedIn.get())
                    this.auth.isSignedIn.listen(this.onAuthChange)
                })
        })
    }

    onAuthChange = (isSignedIn: boolean): void => {
        if (this.auth) {
            if (isSignedIn) {
                this.props.signIn(this.auth.currentUser.get().getId())
            } else {
                this.props.signOut()
            }
        }
    }

    onSignInOutClick = async (): Promise<void> => {
        if (this.auth) {
            if (this.props.isSignedIn) {
                this.auth.signOut()
            } else {
                await this.auth.signIn()
            }
        }
    }

    renderAuthButton(): Nullable<JSX.Element> {
        const { isSignedIn } = this.props
        if (isSignedIn) {
            return (
                <button onClick={this.onSignInOutClick} className="ui red google button">
                    <i className="google icon"></i>
                    <span>Sign Out</span>
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInOutClick} className="ui red google button">
                    <i className="google icon"></i>
                    <span>Sign In with Google</span>
                </button>
            )
        }
    }

    render(): JSX.Element {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state: State) => {
    return { isSignedIn: state.authentication.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)
