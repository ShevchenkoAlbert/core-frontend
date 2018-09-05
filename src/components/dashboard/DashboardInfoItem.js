import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const AdditionalInfo = (item, i) => (
  <p
    className={
      classnames('DashboardInfoItem__additional_text', {
        'nonData': item.number === 0,
        '': item.number !== 0,
        'title': !item.number,
      })
    }
    key={i}
  >
    <span>
      { item.number }
    </span>
    { item.text }
  </p>
);

const DashboardInfoItem = (props) => {
  const {
    additionalInfo,
    additionalInfoTitle,
    bigNum,
    iconClass,
    text,
  } = props;
  return (
    <li className="DashboardInfoItem">
      <div className="DashboardInfoItem__row">
        <div className={classnames('DashboardInfoItem__num', {
          'nonData': bigNum === 0,
          '': bigNum !==0,
        })}
        >
          { bigNum }
        </div>
        <div className="DashboardInfoItem__text">
          {
            iconClass
              ? <span className={iconClass} />
              : null
          }
          {text}
        </div>
      </div>
      {
        additionalInfo
          ? (
            <div className="DashboardInfoItem__additional">
              {
                additionalInfoTitle
                  ? <p className="DashboardInfoItem__additional_title">{additionalInfoTitle}</p>
                  : null
              }
              {
                additionalInfo && additionalInfo.length && Array.isArray(additionalInfo)
                && additionalInfo.map(AdditionalInfo)
              }
            </div>
          )
          : null
      }
    </li>
  );
};

DashboardInfoItem.defaultProps = {
  iconClass: '',
  text: '',
  additionalInfo: null,
};

DashboardInfoItem.propTypes = {
  additionalInfo: PropTypes.instanceOf(Array),
  bigNum: PropTypes.number.isRequired,
  iconClass: PropTypes.string,
  text: PropTypes.string,
  additionalInfoTitle: PropTypes.string,
};

export default DashboardInfoItem;
