import { Dispatch } from 'redux'

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

export type DispatchFunction = (dispatch: Dispatch) => Promise<void>
