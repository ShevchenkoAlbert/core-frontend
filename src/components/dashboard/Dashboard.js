import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { NotificationContainer } from 'react-notifications';
import CoreLoyaut from '../core/CoreLoyaut';
import Sidebar from '../../containers/Sidebar';
import DashboardContent from '../../containers/dashboard/DashboardContent';
import { sortToUpper } from '../../helpers';

class Dashboard extends Component {
  componentWillMount() {
    const {
      getdashboardInfoData,
      getKeywordsData,
      getCitationsData,
      getDataForChart,
    } = this.props;
    getdashboardInfoData('90days');
    getCitationsData();
    getKeywordsData();
    getDataForChart();
  }

  componentWillReceiveProps(nextProps) {
    const { keywordData } = nextProps;
    const { setLinkArtifact } = this.props;
    const startKeyword = sortToUpper(keywordData, 'count');
    if (startKeyword.length !== 0) setLinkArtifact(startKeyword[0]);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>
            ARTIFACTS | Dashboard
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
          <DashboardContent />
        </CoreLoyaut>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getdashboardInfoData: PropTypes.func.isRequired,
  setLinkArtifact: PropTypes.func.isRequired,
  getKeywordsData: PropTypes.func.isRequired,
  getCitationsData: PropTypes.func.isRequired,
  getDataForChart: PropTypes.func.isRequired,
  keywordData: PropTypes.instanceOf(Array).isRequired,
};
export default Dashboard;
