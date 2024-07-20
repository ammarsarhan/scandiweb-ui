import React from "react";
/* No longer causes an error with CRACO */
import '@/static/index.css';

export default function App() {
  return (
    /* Ensuring tailwind is configured correctly */
    <div className="m-4">
      Hi, Scandiweb!
    </div>
  );
}
