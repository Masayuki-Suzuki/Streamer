import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
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
                <Switch>
                    <Route path="/" exact component={StreamList} />
                    <Route path="/stream/new" exact component={StreamCreate} />
                    <Route path="/stream/edit/:id" component={StreamEdit} />
                    <Route path="/stream/delete/:id" component={StreamDelete} />
                    <Route path="/stream/:id" component={StreamShow} />
                </Switch>
            </Router>
        </div>
    )
}

export default App
