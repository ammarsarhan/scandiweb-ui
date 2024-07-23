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
          <Redirect to="/category/all"/>
        </Route>
        <Route exact path="/category/all">
          <Category variant='all'/>
        </Route>
        <Route exact path="/category/clothes">
          <Category variant='clothes'/>
        </Route>
        <Route exact path="/category/tech">
          <Category variant='tech'/>
        </Route>
        <Route exact path="/details/:id">
          <Details/>
        </Route>
      </Switch>
    );
  }
}

// import { Routes, Route, Navigate } from 'react-router-dom';

      // // Setting up routing with React Router V6
      // <Routes>
      //   {/* Automatically redirect index page to first category as per spec */}
      //   <Route path='/' element={ <Navigate to="/category/all"/>} />
      //   <Route path="/category/all" element={ <Category variant="all"/> } />
      //   <Route path="/category/clothes" element={ <Category variant="clothes"/> } />
      //   <Route path="/category/tech" element={ <Category variant="tech"/> } />
      //   <Route path="/details/:id" element={ <Details/> } />
      // </Routes>