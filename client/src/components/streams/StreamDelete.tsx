import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteStream, fetchStream } from '../../actions'
import history from '../../libs/history'
import { RouterProps } from '../../types/routerProps'
import { State, Stream } from '../../types/state'
import Modal, { ModalPropsType } from '../Modal'

type RouterPropsMatchParams = {
    id: string
}

type StreamDeletePropsType = RouterProps<RouterPropsMatchParams> & {
    stream: Stream
    deleteStream: (id: string) => void
    fetchStream: (id: string) => void
}

class StreamDelete extends React.Component<StreamDeletePropsType> {
    componentDidMount(): void {
        this.props.fetchStream(this.props.match.params.id)
    }

    onDismiss = () => history.push('/')

    renderActions = (): JSX.Element => {
        const { id } = this.props.match.params
        return (
            <React.Fragment>
                <Link to="/" className="ui button">
                    Cancel
                </Link>
                <button onClick={() => this.props.deleteStream(id)} className="ui button negative">
                    Delete
                </button>
            </React.Fragment>
        )
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?'
        }

        return `Are you sure you want to delete this stream with title: ${this.props.stream.title} ?`
    }

    modalProps: ModalPropsType = {
        title: 'Delete Stream',
        content: this.renderContent(),
        actions: this.renderActions,
        onDismiss: this.onDismiss
    }

    render() {
        return <Modal {...this.modalProps} />
    }
}

const mapStateToProps = (state: State, ownProps: StreamDeletePropsType) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { deleteStream, fetchStream })(StreamDelete)
