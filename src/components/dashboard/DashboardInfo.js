import React from 'react';
import PropTypes from 'prop-types';
import DashboardInfoItem from './DashboardInfoItem';

const DashboardInfo = (props) => {
  const {
    data,
    citationsData,
    shares,
    downloads,
    PoE,
  } = props;
  return (
    <div className="Dashboard__info">
      <ul className="Dashboard__info_list">
        <DashboardInfoItem
          bigNum={PoE}
          text="PROOFS OF EXISTENCE"
          iconClass="icon-flag"
        />

        <DashboardInfoItem
          bigNum={citationsData.total}
          text="TOTAL CITATIONS"
          additionalInfo={[
            {
              number: citationsData.given,
              text: 'Given',
            },
            {
              number: citationsData.received,
              text: 'Received',
            },
            {
              number: citationsData.mag_citations_count,
              text: 'MAG Citations',
            },
          ]}
          additionalInfoTitle={<span>Through <br/>Blockchain</span>}
          iconClass="icon-broken-link"
        />
        <DashboardInfoItem
          bigNum={downloads}
          text="DOWNLOADS"
          iconClass="icon-download"
        />
        <DashboardInfoItem
          bigNum={shares}
          text="SHARES"
          iconClass="icon-share"
        />
      </ul>
    </div>
  );
};

DashboardInfo.defaultProps = {
  data: {},
  citationsData: {},
};

DashboardInfo.propTypes = {
  data: PropTypes.instanceOf(Object),
  citationsData: PropTypes.instanceOf(Object),
  shares: PropTypes.number.isRequired,
  downloads: PropTypes.number.isRequired,
  PoE: PropTypes.number.isRequired,
};
export default DashboardInfo;
