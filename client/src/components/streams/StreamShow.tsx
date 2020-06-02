import '../../styles/StreamShow.sass'
import FlvJs from 'flv.js'
import React, { RefObject } from 'react'
import flv from 'flv.js'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'
import { RouterProps } from '../../types/routerProps'
import { State, Stream } from '../../types/state'
import { Nullable } from '../../types/utilities'

type RouterPropsMatchParams = {
    id: string
}

type StreamShowPropsType = RouterProps<RouterPropsMatchParams> & {
    fetchStream: (id: string) => void
    stream: Stream
}

type StreamShowState = unknown

class StreamShow extends React.Component<StreamShowPropsType, StreamShowState> {
    videoRef: Nullable<RefObject<any>> = null
    player: Nullable<FlvJs.Player> = null

    constructor(props) {
        super(props)
        this.videoRef = React.createRef()
    }

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
        this.buildPlayer()
    }

    componentDidUpdate(prevProps: Readonly<StreamShowPropsType>, prevState: Readonly<StreamShowState>, snapshot?: any) {
        this.buildPlayer()
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.destroy()
        }
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return
        }

        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8080/live/${this.props.match.params.id}.flv`
        })
        if (this.videoRef) {
            this.player.attachMediaElement(this.videoRef.current)
            this.player.load()
        }
    }

    render(): JSX.Element {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        const { title, description } = this.props.stream

        return (
            <div>
                <video className="video" ref={this.videoRef} controls />
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
