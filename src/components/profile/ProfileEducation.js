import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { NotificationContainer } from 'react-notifications';
import ComingSoon from '../core/ComingSoon';

class ProfileEducation extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>
            ARTIFACTS | Profile Education
          </title>
        </Helmet>
        <NotificationContainer />
        <ComingSoon />
      </React.Fragment>
    );
  }
}

ProfileEducation.propTypes = {
};
export default ProfileEducation;
