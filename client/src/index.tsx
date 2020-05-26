import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import App from './components/App'
import reducers from './reducers'

/* Use redux devtools devtools*/
interface ExWindow extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
}

// eslint-disable-next-line
declare var window: ExWindow
const composeReduxDevToolsEnhancers =
    (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store = createStore(reducers, composeReduxDevToolsEnhancers(applyMiddleware()))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
