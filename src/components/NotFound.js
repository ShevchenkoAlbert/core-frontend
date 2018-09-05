import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import CoreLoyaut from './core/CoreLoyaut';
import Sidebar from '../containers/Sidebar';
import Footer from './common/Footer';
import img404 from '../img/404.jpg';

class NotFound extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>
            ARTIFACTS | Not Found
          </title>
        </Helmet>
        <CoreLoyaut
          sidebar={(
            <Sidebar
              name={localStorage.getItem('fullName')}
              userImage={null}
            />
          )}
        >
          <div className="notFoundPage_content">
            <img src={img404} />
            <h1>
              PAGE NOT FOUND
            </h1>
            <h2>
              It seems that this page doesn&#39;t exist anymore
            </h2>
            <Link to="/dashboard" className="link_home">
              Go to Dashboard
            </Link>
            <Footer />
          </div>
        </CoreLoyaut>
      </div>
    );
  }
}

export default NotFound;
