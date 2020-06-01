import { SignIn, SignOut } from '../types/actions'
import { Authentication } from '../types/state'
import { SIGN_IN, SIGN_OUT } from '../actions/types'

const INITIAL_STATE: Authentication = {
    isSignedIn: false,
    userId: null
}

export default (state = INITIAL_STATE, action: SignIn | SignOut): Authentication => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload }
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null }
        default:
            return state
    }
}
