import '@/static/index.css';

import { Component } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import Category from "@/views/Category";
import Details from "@/views/Details";

export default class App extends Component {
  render () {
    return (
      // Setting up routing with React Router V6
      <Routes>
        {/* Automatically redirect index page to first category as per spec */}
        <Route path='/' element={ <Navigate to="/category/women"/>} />
        <Route path="/category/women" element={ <Category variant="women"/> } />
        <Route path="/category/men" element={ <Category variant="men"/> } />
        <Route path="/category/kids" element={ <Category variant="kids"/> } />
        <Route path="/details/:id" element={ <Details/> } />
      </Routes>
    );
  }
}
