import '@/static/index.css';

import { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Category from "@/views/Category";
import Details from "@/views/Details";

export default class View extends Component {
  render () {
    return (
      // Setting up routing with react-router-dom@5.3.3
      // to ensure ONLY class-based components across project as per spec
      // v6 would not allow us to useParams()
      <Switch>
        <Route exact path="/">
          <Redirect to="/all"/>
        </Route>
        <Route exact path="/all">
          <Category variant='all'/>
        </Route>
        <Route exact path="/clothes">
          <Category variant='clothes'/>
        </Route>
        <Route exact path="/tech">
          <Category variant='tech'/>
        </Route>
        <Route exact path="/details/:id" component={Details}/>
      </Switch>
    );
  }
}