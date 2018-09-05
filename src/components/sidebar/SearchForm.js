import React from 'react';
import PropTypes from 'prop-types';

const SearchForm = (props) => {
  const { isSidebarOpen } = props;
  return (
    <form className="Sidebar__search-form">
      <label hasfor="search" className="Sidebar__search-label icon-search-icon">
        {/* <span className=""></span> */}
        <input
          id="search"
          className="Sidebar__search-input"
          type="text"
          placeholder={(isSidebarOpen || window.innerWidth <= 1024 ? 'Search...' : '')}
        />
      </label>
    </form>
  );
};

SearchForm.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};
export default SearchForm;
