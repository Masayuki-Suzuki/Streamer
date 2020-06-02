import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { CreateStream, FormValues } from '../../types/actions'
import { Nullable } from '../../types/utilities'

type StreamFormPropsType = InjectedFormProps & {
    createStream?: CreateStream
    onSubmit?: (formValues: FormValues) => void
}
type StreamFormState = {
    errorMessage: Nullable<string>
}

class StreamForm extends React.Component<StreamFormPropsType, StreamFormState> {
    state = {
        errorMessage: null
    }

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>
                    {label}
                    <input {...input} autoComplete="off" />
                </label>
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = async (formValues: FormValues) => {
        if (this.props.onSubmit) {
            try {
                this.props.onSubmit(formValues)
                if (this.state.errorMessage) {
                    this.setState({ errorMessage: null })
                }
            } catch (e) {
                console.error(e)
                this.setState({ errorMessage: `An unexpected error occurred: ${e.message}` })
            }
        } else {
            this.setState({ errorMessage: 'Developer forget passing onSubmit function via props!!' })
        }
    }

    render(): JSX.Element {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                {this.state.errorMessage ? <p className="ui error message">{this.state.errorMessage}</p> : null}
                <Field name="title" component={this.renderInput} label="Enter title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">submit</button>
            </form>
        )
    }
}

const validate = (formValues: FormValues): FormValues => {
    const errors: FormValues = {}

    if (!formValues.title) {
        errors.title = 'You must enter a title.'
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description.'
    }

    return errors
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm)
