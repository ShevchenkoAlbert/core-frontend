import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { NotificationContainer } from 'react-notifications';
import '../../../node_modules/react-notifications/lib/notifications.css';

class Home extends Component {
  render() {
    return (
      <div className="home-page-wrapper">
        <Helmet>
          <title>
            ARTIFACTS | Home
          </title>
        </Helmet>
        <NotificationContainer />
      </div>
    );
  }
}

export default Home;
