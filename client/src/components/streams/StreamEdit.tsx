import * as H from 'history'
import React from 'react'
import { match } from 'react-router-dom'
import { State, Stream } from 'src/types/state'
import { connect } from 'react-redux'
import { fetchStream, editStream } from '../../actions'
import { FormValues } from '../../types/actions'
import StreamForm from './StreamForm'

type Params = {
    id: string
}

type StreamEditPropsType = {
    match: match<Params>
    location: H.Location
    history: H.History
    stream: Stream
    fetchStream: (id: string) => void
    editStream: (id: string, formValues: FormValues) => void
}

type StreamEditState = unknown

class StreamEdit extends React.Component<StreamEditPropsType, StreamEditState> {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = (formValues: FormValues) => {
        console.log(formValues)
        this.props.editStream(this.props.match.params.id, formValues)
    }

    render(): JSX.Element {
        if (!this.props.stream) {
            return <div> Loading... </div>
        }

        const initialValues: FormValues = {
            title: this.props.stream.title,
            description: this.props.stream.description
        }

        return (
            <div>
                <h2 className="header">Edit a Stream</h2>
                <StreamForm
                    onSubmit={this.onSubmit}
                    initialValues={initialValues}
                    // This is case of using Lodash, but I don’t think it need to use it.
                    // initialValues={_.pick(this.props.stream, 'title', 'description')}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: State, ownProps: StreamEditPropsType) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit)
