import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewNote from './pages/NewNote';
import AlterNote from './pages/AlterNote';
export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/create" component={NewNote} />
                <Route path="/alter" component={AlterNote} />
            </Switch>
        </BrowserRouter>
    );
}