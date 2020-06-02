import { Dispatch } from 'redux'
import { State } from './state'
import { ThunkAction } from 'redux-thunk'

export type SignIn = {
    type: 'SIGN_IN'
    payload: string
}

export type SignOut = {
    type: 'SIGN_OUT'
}

export type FormValues = {
    title?: string
    description?: string
}

export type CreateStream = (formValue: FormValues) => CreateStreamDispatch

export type DispatchFunction = ThunkAction<Promise<void>, State>

export type GetState = () => State
