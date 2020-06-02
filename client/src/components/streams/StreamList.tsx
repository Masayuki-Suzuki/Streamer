import '../../styles/StreamList.sass'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchStreams } from '../../actions'
import { Stream, State } from '../../types/state'
import { Nullable } from '../../types/utilities'

type StreamListPropsType = {
    fetchStreams: () => void
    streams: Stream[]
    currentUserId: Nullable<string>
    isSignedIn: boolean
}
type StreamListState = unknown

class StreamList extends React.Component<StreamListPropsType, StreamListState> {
    componentDidMount() {
        this.props.fetchStreams()
    }

    renderList() {
        return this.props.streams.map((stream: Stream) => {
            return (
                <div className="stream-list__item" key={stream.id}>
                    <div className="stream-list__details">
                        <i className="large middle aligned icon camera" />
                        <div className="content">
                            <Link to={`/stream/${stream.id}`} className="header">
                                {stream.title}
                            </Link>
                            <p className="description">{stream.description}</p>
                        </div>
                    </div>
                    {this.renderAdmin(stream)}
                </div>
            )
        })
    }

    renderAdmin = (stream: Stream): Nullable<JSX.Element> => {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="admin-buttons content">
                    <Link className="ui button primary" to={`/stream/edit/${stream.id}`}>
                        Edit
                    </Link>
                    <Link className="ui button negative" to={`/stream/delete/${stream.id}`}>
                        Delete
                    </Link>
                </div>
            )
        }
        return null
    }

    renderCreate(): Nullable<JSX.Element> {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right', paddingRight: '16px' }}>
                    <Link to="/stream/new">
                        <button className="ui button primary">Create New Stream</button>
                    </Link>
                </div>
            )
        }
        return null
    }

    render(): JSX.Element {
        return (
            <div>
                <h2 className="header">Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        )
    }
}

const mapStateToProps = (state: State): Omit<StreamListPropsType, 'fetchStreams'> => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.authentication.userId,
        isSignedIn: state.authentication.isSignedIn
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList)
