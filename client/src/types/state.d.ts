import { Nullable } from './utilities'

export type State = {
    authentication: Authentication
}

export type Authentication = {
    isSignedIn: boolean
    userId: Nullable<string>
}
