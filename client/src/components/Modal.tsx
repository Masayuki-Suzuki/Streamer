import React from 'react'
import ReactDOM from 'react-dom'
import { Nullable } from '../types/utilities'

export type ModalPropsType = {
    title: string
    content: string
    actions: () => JSX.Element
    onDismiss: () => void
}

const Modal = (props: ModalPropsType): Nullable<JSX.Element> => {
    const target = document.getElementById('modal')
    if (target) {
        return ReactDOM.createPortal(
            <div onClick={props.onDismiss} className="ui dimmer modals visible active">
                <div onClick={e => e.stopPropagation()} className="ui standard modal visible active">
                    <h2 className="header">{props.title}</h2>
                    <div className="content">
                        <p className="description">{props.content}</p>
                    </div>
                    <div className="actions">{props.actions()}</div>
                </div>
            </div>,
            target
        )
    }
    return null
}

export default Modal
