import React from 'react';
import {Link} from 'react-router';

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <p>About page!</p>
        <Link to="/" className="btn btn-primary btn-lg">Back to home</Link>
      </div>
    );
  }
}

export default AboutPage;