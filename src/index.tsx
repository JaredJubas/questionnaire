import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Questionnaire } from './components/Questionnaire/Questionnaire';

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<Questionnaire />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
