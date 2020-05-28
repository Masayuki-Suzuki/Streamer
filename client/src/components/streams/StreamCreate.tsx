import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'

type StreamCreateState = Record<string, unknown>
type FormValues = {
    title?: string
    description?: string
}

class StreamCreate extends React.Component<InjectedFormProps, StreamCreateState> {
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

    onSubmit(formValues: FormValues) {
        console.log(formValues)
    }

    render(): JSX.Element {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
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
    form: 'streamCreate',
    validate
})(StreamCreate)
