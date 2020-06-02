import { Nullable } from './utilities'

export type State = {
    authentication: Authentication
    streams: ObjectBaseStream
}

export type Authentication = {
    isSignedIn: boolean
    userId: Nullable<string>
}

export type Stream = {
    id: number
    title: string
    description: string
    userId: string
}

export type ObjectBaseStream = {
    [index: number]: Stream
}
