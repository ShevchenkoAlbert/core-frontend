import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class FixedPanel extends Component {
  render() {
    const {
      style,
      className,
      children,
    } = this.props;

    return (
      <div
        className={`FixedPanel ${className || ''}`}
        style={style}
      >
        {children}
      </div>
    );
  }
}


FixedPanel.defaultProps = {
  className: '',
}

FixedPanel.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}
