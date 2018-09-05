import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
// import { CSSTransitionGroup } from 'react-transition-group';

import sidebarLogo from '../../img/sidebar-Logo.svg';
import sidebarLogo2 from '../../img/Logo-2.svg';

export default class SidebarLogo extends Component {
  render() {
    const { isSidebarOpen } = this.props;
    return (
      <Link className="Sidebar__mainLink" to="/dashboard">

        <CSSTransition
          classNames="sidebar-logo"
          timeout={300}
        >
          {
            (isSidebarOpen || window.innerWidth <= 1024)
              ? <img className="Sidebar__logo Sidebar__logo--big" src={sidebarLogo} />
              : <img className="Sidebar__logo Sidebar__logo--small" src={sidebarLogo2} />
          }
        </CSSTransition>

        {/* <CSSTransitionGroup
                name="sidebar-logo"
                transitionName="sidebar-logo"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
              >
                {
                  isSidebarOpen || window.innerWidth <= 1024
                    ? <img className="Sidebar__logo Sidebar__logo--big" src={require('../../img/sidebar-Logo.svg')}/>
                    : null
                }
              </CSSTransitionGroup>

              <CSSTransitionGroup
                name="sidebar-logo"
                transitionName="sidebar-logo"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
              >
                {
                  isSidebarOpen || window.innerWidth <= 1024
                    ? null
                    : <img className="Sidebar__logo Sidebar__logo--small" src={require('../../img/Logo-2.svg')} />
                }
              </CSSTransitionGroup> */}


      </Link>
    );
  }
}

SidebarLogo.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};

// export default SidebarLogo;
