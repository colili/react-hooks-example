import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
// import ClassExample from './ClassExample'
import HooksExample from './HooksExample'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
     {/* <ClassExample /> */}
     <HooksExample/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
