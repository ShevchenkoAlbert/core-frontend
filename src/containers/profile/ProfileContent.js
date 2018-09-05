import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import CoreLoyautHeader from '../../components/core/CoreLoyautHeader';
import HeaderMenuItem from '../../components/common/HeaderMenuItem';
import { changeSidebarView } from '../../store/actions/core_actions';
import ProfileGeneral from './ProfileGeneral';
import { monthNames } from '../../helpers';
import ProfileSocial from '../../components/profile/ProfileSocial';
import ProfileEducation from '../../components/profile/ProfileEducation';
import ProfileEmployment from '../../components/profile/ProfileEmployment';
import { getProfileData } from '../../store/actions/profile_actions';


class ProfileContent extends Component {
  render() {
    const {
      sidebarState,
      changeSidebarView,
      userProfileData,
    } = this.props;

    return (
      <section className="ProfilePage">
        <div className="CoreLoyautHeader ProfilePage__header ArtifactsPage__header">
          <CoreLoyautHeader
            changeSidebarView={changeSidebarView}
            sidebarState={sidebarState}
            title={`${userProfileData.family_name} ${userProfileData.given_name}`}
            subText={`Member since ${monthNames[userProfileData.created_month -1]} ${userProfileData.created_year}`}
          >
            <nav className="ArtifactsPage__nav">
              <ul className="ArtifactsPage__nav_list">

                <HeaderMenuItem
                  key="General"
                  linkUrl="/profile"
                  className=""
                  activeClassName="active"
                  exact
                >
                  General
                </HeaderMenuItem>

                <HeaderMenuItem
                  key="Social"
                  linkUrl="/profile/social"
                  className=""
                  activeClassName="active"
                >
                  Social
                </HeaderMenuItem>

                <HeaderMenuItem
                  key="Education"
                  linkUrl="/profile/education"
                  className=""
                  activeClassName="active"
                >
                  Education
                </HeaderMenuItem>

                <HeaderMenuItem
                  key="Employment"
                  linkUrl="/profile/employment"
                  className=""
                  activeClassName="active"
                >
                  Employment
                </HeaderMenuItem>

              </ul>
            </nav>
          </CoreLoyautHeader>
        </div>
        <div className="CoreLoyaut__inner ProfilePage__inner">
          <Switch>
            <Route
              exact
              path="/profile"
              component={() => (
                <ProfileGeneral
                  sidebarState={sidebarState}
                />
              )}
            />
            <Route
              path="/profile/social"
              component={ProfileSocial}
            />
            <Route
              path="/profile/education"
              component={ProfileEducation}
            />
            <Route
              path="/profile/employment"
              component={ProfileEmployment}
            />
          </Switch>
        </div>
      </section>
    );
  }
}


const mapStateToProps = state => ({
  sidebarState: state.core_reducers.sidebar_view,
  userProfileData: state.profile_reducer.profileData,
});

const mapDispatchToProps = (dispatch, props) => ({
  changeSidebarView: newSidebarView => dispatch(changeSidebarView(newSidebarView)),
  getProfileDatas: () => dispatch(getProfileData()),
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(ProfileContent));
