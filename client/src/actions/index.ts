import { Dispatch } from 'redux'
import { DispatchFunction, SignIn, SignOut, FormValues } from 'src/types/actions'
import streams from '../apis/streams'
import { CREATE_STREAM, DELETE_STREAM, EDIT_STREAM, FETCH_STREAM, FETCH_STREAMS, SIGN_IN, SIGN_OUT } from './types'

export const signIn = (userId: string): SignIn => {
    return { type: SIGN_IN, payload: userId }
}

export const signOut = (): SignOut => {
    return { type: SIGN_OUT }
}

export const createStream = (formValues: FormValues): DispatchFunction => async (dispatch: Dispatch): Promise<void> => {
    const { data } = await streams.post('/streams', formValues)

    dispatch({ type: CREATE_STREAM, payload: data })
}

export const fetchStreams = (): DispatchFunction => async (dispatch: Dispatch): Promise<void> => {
    const { data } = await streams.get('/streams')
    dispatch({ type: FETCH_STREAMS, payload: data })
}

export const fetchStream = (id: number): DispatchFunction => async (dispatch: Dispatch): Promise<void> => {
    const { data } = await streams.get(`/streams/${id}`)
    dispatch({ type: FETCH_STREAM, payload: data })
}

export const editStream = (id: number, formValues: FormValues): DispatchFunction => async (
    dispatch: Dispatch
): Promise<void> => {
    const { data } = await streams.put(`/streams/${id}`, formValues)
    dispatch({ type: EDIT_STREAM, payload: data })
}

export const deleteStream = (id: number): DispatchFunction => async (dispatch: Dispatch): Promise<void> => {
    await streams.delete(`/streams/${id}`)
    dispatch({ type: DELETE_STREAM, payload: id })
}
