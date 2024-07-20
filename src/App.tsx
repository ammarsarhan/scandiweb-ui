import '@/static/index.css';

import { Routes, Route } from "react-router-dom";

import Category from "@/views/Category";
import Details from "@/views/Details";

export default function App() {
  return (
    <div className="m-4">
        <Routes>
          <Route path="/" element={ <Category/> } />
          <Route path="/details" element={ <Details/> } />
        </Routes>
    </div>
  );
}
