import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CoreLoyaut extends Component {
  render() {
    const { sidebar, children } = this.props;
    return (
      <section className="CoreLoyaut">
        <div className="CoreLoyaut__sidebar">
          { sidebar }
        </div>
        <div className="CoreLoyaut__content">
          { children }
        </div>
      </section>
    );
  }
}
CoreLoyaut.propTypes = {
  children: PropTypes.element.isRequired,
  sidebar: PropTypes.element.isRequired,
};
export default CoreLoyaut;
