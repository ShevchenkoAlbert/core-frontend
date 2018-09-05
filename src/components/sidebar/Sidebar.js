import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomScroll from 'react-custom-scroll';
import 'react-custom-scroll/dist/customScroll.css';

import SidebarLogo from './SidebarLogo';
import SearchForm from './SearchForm';
import { config } from '../../env';

const DashboardSvg = require('-!svg-react-loader!../../img/dashboard.svg');
const ArtifactsSvg = require('-!svg-react-loader!../../img/share-s.3.svg');
const AnalyticsSvg = require('-!svg-react-loader!../../img/profits-c.svg');
const CommunitySvg = require('-!svg-react-loader!../../img/CommunitySvg.svg');
const TransactionsSvg = require('-!svg-react-loader!../../img/physics.svg');


class Sidebar extends Component {
  render() {
    const {
      isSidebarOpen,
      userPhoto,
      userName,
      logOut,
      getProfileData,
    } = this.props;

    return (
      <aside className={`Sidebar ${isSidebarOpen ? '' : 'Sidebar--close'}`}>
        <div className="Sidebar__fixed">
          <CustomScroll heightRelativeToParent="100%" minScrollHandleHeight={15}>

            <div className="Sidebar__top">
              <SidebarLogo isSidebarOpen={isSidebarOpen} />
            </div>

            <div className="Sidebar__fixed_mobile">

              <div className="Sidebar__userProfile">
                <NavLink
                  className="Sidebar__userProfile_link"
                  to="/profile"
                  activeClassName="active"
                  onClick={getProfileData}
                >
                  <div className="Sidebar__userProfile_photo">
                    {
                      userPhoto
                        ? <img className="Sidebar__userProfile_img" src={userPhoto} alt="User photo" />
                        : <img className="Sidebar__userProfile_defaultImg" src={require('../../img/user-01.svg')} />
                    }
                    <div className="Sidebar__userProfile_settingsIcon">
                      <span className="icon-settings" />
                    </div>
                  </div>
                  <p className="Sidebar__userProfile_name">
                    { `${userName.family_name} ${userName.given_name}` }
                  </p>
                </NavLink>
              </div>
              <SearchForm isSidebarOpen={isSidebarOpen} />


              <nav className="Sidebar__nav">

                <ul className="Sidebar__nav_list">
                  <li className="Sidebar__nav_item">
                    <NavLink to="/dashboard" className="Sidebar__nav_link " activeClassName="active">
                      <span className="Sidebar__nav_icon">
                        <DashboardSvg />
                      </span>
                      <span className="Sidebar__nav_text">
                        DASHBOARD
                      </span>
                    </NavLink>
                  </li>

                  <li className="Sidebar__nav_item">
                    <NavLink to="/artifacts" className="Sidebar__nav_link" activeClassName="active">
                      <span className="Sidebar__nav_icon">
                        <ArtifactsSvg />
                      </span>
                      <span className="Sidebar__nav_text">
                        Artifacts
                      </span>
                    </NavLink>
                  </li>

                  <li className="Sidebar__nav_item">
                    <NavLink to="/analytics" className="Sidebar__nav_link" activeClassName="active">
                      <span className="Sidebar__nav_icon">
                        <AnalyticsSvg />
                      </span>
                      <span className="Sidebar__nav_text">
                        ANALYTICS
                      </span>
                    </NavLink>
                  </li>

                  <li className="Sidebar__nav_item">
                    <NavLink to="/community" className="Sidebar__nav_link" activeClassName="active">
                      <span className="Sidebar__nav_icon">
                        <CommunitySvg />
                      </span>
                      <span className="Sidebar__nav_text">
                        COMMUNITY
                      </span>
                    </NavLink>
                  </li>


                  <li className="Sidebar__nav_item">
                    <NavLink to="/transactions" className="Sidebar__nav_link" activeClassName="active">
                      <span className="Sidebar__nav_icon">
                        <TransactionsSvg />
                      </span>
                      <span className="Sidebar__nav_text">
                        TRANSACTIONS
                      </span>
                    </NavLink>
                  </li>

                  <li className="Sidebar__nav_item Sidebar__nav_item--external">
                    <p className="Sidebar__nav_link Sidebar__nav_link--external">
                      <span className="Sidebar__nav_icon">
                        <img className="Sidebar__nav_icon-img" src={require('../../img/group-90.svg')} />
                      </span>
                      <span className="Sidebar__nav_text">
                        <a href={config.PROJECT_MANAGMENT_SYSTEM}>
                          PROJECT MANAGMENT <br />SYSTEM
                        </a>
                      </span>
                    </p>
                  </li>
                </ul>
              </nav>

              <div className="Sidebar__footer">
                <ul className="Sidebar__social-list">
                  <li className="Sidebar__social-item">
                    <a className="Sidebar__social-link icon-facebook-logo" href="https://www.facebook.com/artifactsofresearch/" />
                  </li>
                  <li className="Sidebar__social-item">
                    <a className="Sidebar__social-link icon-twitter-logo" href="https://twitter.com/ARTiFACTS_DLT" />
                  </li>
                  <li className="Sidebar__social-item">
                    <a className="Sidebar__social-link icon-youtube-logo" href="https://www.youtube.com/channel/UCzjhsdDzs86iSkhzYdBGTqw" />
                  </li>
                </ul>
                <div className="Sidebar__footer_bottom">
                  <Link className="Sidebar__logout-link" to="" onClick={logOut}>
                    LOG OUT
                  </Link>
                </div>
              </div>

            </div>
          </CustomScroll>
        </div>
      </aside>
    );
  }
}

Sidebar.defaultProps = {
  userPhoto: null,
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  getProfileData: PropTypes.func.isRequired,
  userPhoto: PropTypes.string,
  userName: PropTypes.instanceOf(Object).isRequired,
  getProfileData: PropTypes.func.isRequired,
};
export default Sidebar;
