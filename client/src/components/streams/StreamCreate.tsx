import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { CreateStream, FormValues } from 'src/types/actions'
import { Nullable } from '../../types/utilities'
import { createStream } from '../../actions'
import StreamForm from './StreamForm'

type StreamCreateProps = InjectedFormProps & {
    createStream?: CreateStream
}
type StreamCreateState = {
    errorMessage: Nullable<string>
}

class StreamCreate extends React.Component<StreamCreateProps, StreamCreateState> {
    onSubmit = async (formValues: FormValues) => {
        if (this.props.createStream) {
            await this.props.createStream(formValues)
        }
    }

    render(): JSX.Element {
        return (
            <div>
                <h2 className="header">Create a Stream</h2>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}

export default connect(null, { createStream })(StreamCreate)
