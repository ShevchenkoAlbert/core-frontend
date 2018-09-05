import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { NotificationContainer } from 'react-notifications';
import ComingSoon from './ComingSoon';

class ResearchRecords extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>
            ARTIFACTS | Research Records
          </title>
        </Helmet>
        <NotificationContainer />
        <ComingSoon />
      </React.Fragment>
    );
  }
}

ResearchRecords.propTypes = {
};
export default ResearchRecords;
