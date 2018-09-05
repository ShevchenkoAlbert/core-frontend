import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { NotificationContainer } from 'react-notifications';
import CoreLoyaut from '../../components/core/CoreLoyaut';
import Sidebar from '../Sidebar';
import { getProfileData } from '../../store/actions/profile_actions';
import ProfileContent from './ProfileContent';


class Profile extends Component {
  componentWillMount() {
    const { getProfileDatas } = this.props;
    getProfileDatas();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>
            ARTIFACTS | Pofile general
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
          <ProfileContent />
        </CoreLoyaut>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  sidebarState: state.core_reducers.sidebar_view,
});

const mapDispatchToProps = (dispatch, props) => ({
  getProfileDatas: () => dispatch(getProfileData()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
