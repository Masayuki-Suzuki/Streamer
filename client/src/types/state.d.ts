import { Nullable } from './utilities'

export type State = {
    authentication: Authentication
}

export type Authentication = {
    isSignedIn: boolean
    userId: Nullable<string>
}

export type Stream = {
    id: number
    title: string
    description: string
}
