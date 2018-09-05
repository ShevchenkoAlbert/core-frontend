import React from 'react';


const CoreLoyautHeader = props => (
  <React.Fragment>
    <div className="">
      <span
        onClick={props.changeSidebarView.bind(null, !props.sidebarState)}
        className={"sidebar-link-trigger " + (props.sidebarState ? ' reverse ': '')}
      >
        <span className="sidebar-link-trigger__middle" />
      </span>
    </div>
    <div className="CoreLoyautHeader__title">
      <h1>
        {props.title}
      </h1>
      {
        props.subText
          ? (
            <p>{props.subText}</p>
          )
          : (null)
      }
    </div>
    <div className="CoreLoyautHeader__content">
      {props.children}
    </div>
  </React.Fragment>
);


export default CoreLoyautHeader;
