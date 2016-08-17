import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import HomePage from './components/home/homePage.jsx';
import AboutPage from './components/about/aboutPage.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
  </Route>
);