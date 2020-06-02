import React from 'react'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'
import { RouterProps } from '../../types/routerProps'
import { State, Stream } from '../../types/state'

type RouterPropsMatchParams = {
    id: string
}

type StreamShowPropsType = RouterProps<RouterPropsMatchParams> & {
    fetchStream: (id: string) => void
    stream: Stream
}

type StreamShowState = unknown

class StreamShow extends React.Component<StreamShowPropsType, StreamShowState> {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    render(): JSX.Element {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        const { title, description } = this.props.stream

        return (
            <div>
                <h1 className="header">{title}</h1>
                <p className="header">{description}</p>
            </div>
        )
    }
}

const mapStateToProps = (state: State, ownProps: StreamShowPropsType) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)
