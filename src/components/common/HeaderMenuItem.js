import React from 'react';
import { NavLink } from 'react-router-dom';


const HeaderMenuItem = props => (
  <li key="Proposed" className="ArtifactsPage__nav_item">
    <NavLink
      to={props.linkUrl}
      className={`ArtifactsPage__nav_link ${props.className ? props.className : ''}`}
      activeClassName="active"
      exact={props.exact ? true : false}
    >
      {props.children}
    </NavLink>
    <span className="ArtifactsPage__nav_notification" />
  </li>
);


export default HeaderMenuItem;
