import React from 'react'
import { Route, Router } from 'react-router-dom'
import history from '../libs/history'
import Header from './Header'
import StreamCreate from './streams/StreamCreate'
import StreamDelete from './streams/StreamDelete'
import StreamEdit from './streams/StreamEdit'
import StreamList from './streams/StreamList'
import StreamShow from './streams/StreamShow'

const App = (): JSX.Element => {
    return (
        <div className="ui container">
            <Router history={history}>
                <Header />
                <div>
                    <Route path="/" exact component={StreamList} />
                    <Route path="/stream/new" exact component={StreamCreate} />
                    <Route path="/stream/edit/:id" component={StreamEdit} />
                    <Route path="/stream/delete/:id" component={StreamDelete} />
                    <Route path="/stream/show/:id" component={StreamShow} />
                </div>
            </Router>
        </div>
    )
}

export default App
