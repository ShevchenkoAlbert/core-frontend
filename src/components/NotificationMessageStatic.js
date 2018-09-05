import React from 'react';
import PropTypes from 'prop-types';

const NotificationMessageStatic = (props) => {
  const { text } = props;
  return (
    <div className="NotificationMessageStatic">
      <div className="NotificationMessageStatic__icon" />
      <div className="NotificationMessageStatic__text">
        <p>
          <span>
            Well done!
          </span>
          { text }
        </p>
      </div>
    </div>
  );
};

NotificationMessageStatic.defaultProps = {
  text: '',
};

NotificationMessageStatic.propTypes = {
  text: PropTypes.string,
};

export default NotificationMessageStatic;
