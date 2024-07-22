import '@/static/index.css';

import { Component } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import Category from "@/views/Category";
import Details from "@/views/Details";

export default class View extends Component {
  render () {
    return (
      // Setting up routing with React Router V6
      <Routes>
        {/* Automatically redirect index page to first category as per spec */}
        <Route path='/' element={ <Navigate to="/category/all"/>} />
        <Route path="/category/all" element={ <Category variant="all"/> } />
        <Route path="/category/clothes" element={ <Category variant="clothes"/> } />
        <Route path="/category/tech" element={ <Category variant="tech"/> } />
        <Route path="/details/:id" element={ <Details/> } />
      </Routes>
    );
  }
}
