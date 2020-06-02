import { Dispatch } from 'redux'
import { DispatchFunction, SignIn, SignOut, FormValues, GetState } from 'src/types/actions'
import history from '../libs/history'
import streams from '../apis/streams'
import { CREATE_STREAM, DELETE_STREAM, EDIT_STREAM, FETCH_STREAM, FETCH_STREAMS, SIGN_IN, SIGN_OUT } from './types'

export const signIn = (userId: string): SignIn => {
    return { type: SIGN_IN, payload: userId }
}

export const signOut = (): SignOut => {
    return { type: SIGN_OUT }
}

export const createStream = (formValues: FormValues): DispatchFunction => async (
    dispatch: Dispatch,
    getState: GetState
): Promise<void> => {
    const { userId } = getState().authentication
    const { data } = await streams.post('/streams', { ...formValues, userId })

    dispatch({ type: CREATE_STREAM, payload: data })
    history.push('/')
}

export const fetchStreams = (): DispatchFunction => async (dispatch: Dispatch): Promise<void> => {
    const { data } = await streams.get('/streams')
    dispatch({ type: FETCH_STREAMS, payload: data })
}

export const fetchStream = (id: string): DispatchFunction => async (dispatch: Dispatch): Promise<void> => {
    const { data } = await streams.get(`/streams/${id}`)
    dispatch({ type: FETCH_STREAM, payload: data })
}

export const editStream = (id: string, formValues: FormValues): DispatchFunction => async (
    dispatch: Dispatch
): Promise<void> => {
    const { data } = await streams.patch(`/streams/${id}`, formValues)
    dispatch({ type: EDIT_STREAM, payload: data })
    history.push('/')
}

export const deleteStream = (id: string): DispatchFunction => async (dispatch: Dispatch): Promise<void> => {
    await streams.delete(`/streams/${id}`)
    dispatch({ type: DELETE_STREAM, payload: id })
    history.push('/')
}
