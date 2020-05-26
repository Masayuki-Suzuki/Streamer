import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

// /* Use redux devtools */
// interface ExWindow extends Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
// }
// // eslint-disable-next-line
// declare var window: ExWindow
// const composeReduxDevToolsEnhancers =
//     (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

// const store = createStore(reducers, composeReduxDevToolsEnhancers(applyMiddleware(thunk)))

ReactDOM.render(<App />, document.getElementById('root'))
