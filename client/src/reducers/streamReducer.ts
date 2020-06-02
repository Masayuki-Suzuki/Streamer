import _ from 'lodash'
import { ObjectBaseStream, Stream } from 'src/types/state'
import { CREATE_STREAM, DELETE_STREAM, EDIT_STREAM, FETCH_STREAM, FETCH_STREAMS } from '../actions/types'

type StreamAction = {
    type: 'CREATE_STREAM' | 'DELETE_STREAM' | 'EDIT_STREAM' | 'FETCH_STREAM' | 'FETCH_STREAMS'
    payload: Stream
}

const INITIAL_STATE: ObjectBaseStream = {}

export default (state = INITIAL_STATE, action: StreamAction): ObjectBaseStream => {
    switch (action.type) {
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') }

        case FETCH_STREAM:
        case CREATE_STREAM:
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload }

        case DELETE_STREAM:
            // eslint-disable-next-line
            // @ts-ignore
            return _.omit(state, action.payload)

        default:
            return state
    }
}
