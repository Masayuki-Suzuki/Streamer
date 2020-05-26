import { SignIn, SignOut } from 'src/types/actions'
import { SIGN_IN, SIGN_OUT } from './types'

export const signIn = (userId: string): SignIn => {
    return { type: SIGN_IN, payload: userId }
}

export const signOut = (): SignOut => {
    return { type: SIGN_OUT }
}
