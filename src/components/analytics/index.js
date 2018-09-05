import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { NotificationContainer } from 'react-notifications';
import CoreLoyaut from '../core/CoreLoyaut';
import Sidebar from '../../containers/Sidebar';
import ComingSoon from '../core/ComingSoon';

class Analytics extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>
            ARTIFACTS | Analytics
          </title>
        </Helmet>
        <NotificationContainer />
        <CoreLoyaut
          sidebar={(
            <Sidebar
              name={localStorage.getItem('fullName')}
              userImage={null}
            />
          )}
        >
          <ComingSoon />
        </CoreLoyaut>
      </div>
    );
  }
}

Analytics.propTypes = {

};
export default Analytics;
