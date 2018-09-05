import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { NotificationContainer } from 'react-notifications';
import ComingSoon from '../core/ComingSoon';

class ProfileEmployment extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>
            ARTIFACTS | Profile Employment
          </title>
        </Helmet>
        <NotificationContainer />
        <ComingSoon />
      </React.Fragment>
    );
  }
}

ProfileEmployment.propTypes = {
};
export default ProfileEmployment;
