import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardInfo from '../../components/dashboard/DashboardInfo';
import KeywordBubbleDiagram from './KeywordBubbleDiagram';
import RangeDateFilter from './RangeDateFilter';
import { changeSidebarView, getdashboardInfoData } from '../../store/actions/core_actions';
import ResponsiveChart from './ResponsiveChart';
import CoreLoyautHeader from '../../components/core/CoreLoyautHeader';
import Footer from '../../components/common/Footer';


class DashboardContent extends Component {
  render() {
    const {
      changeSidebarView,
      sidebarState,
      infoData,
      citationsdata,
      keywordsData,
      chartData,
      PoE,
      downloads,
      shares,
    } = this.props;
    return (
      <section className="Dashboard">
        <div className="CoreLoyautHeader Dashboard__header">
          <CoreLoyautHeader
            changeSidebarView={changeSidebarView}
            sidebarState={sidebarState}
            title="Dashboard"
          >
            <RangeDateFilter />
          </CoreLoyautHeader>
        </div>
        <div className="CoreLoyaut__inner Dashboard__content">

          <DashboardInfo
            data={infoData}
            citationsData={citationsdata}
            shares={shares}
            downloads={downloads}
            PoE={PoE}
          />
          { keywordsData.length ? (
            <div className="Dashboard__keywords">
              <h3 className="Dashboard__widget_title Dashboard__keywords_title">
                KEYWORDS AND ARTIFACTS
              </h3>
              <KeywordBubbleDiagram />
            </div>
          ) : (null)
          }
          { chartData.length ? (
            <div className="Dashboard__transacted-projects">
              <ResponsiveChart />
            </div>
          ) : (null)
          }

          <Footer />
        </div>
      </section>
    );
  }
}


const mapStateToProps = state => ({
  sidebarState: state.core_reducers.sidebar_view,
  infoData: state.core_reducers.infoData,
  citationsdata: state.core_reducers.citationsData,
  keywordsData: state.core_reducers.keywordData,
  chartData: state.core_reducers.chartData,
  shares: state.core_reducers.shares,
  downloads: state.core_reducers.downloads,
  PoE: state.core_reducers.PoE,
});

const mapDispatchToProps = (dispatch, props) => ({
  changeSidebarView: newSidebarView => dispatch(changeSidebarView(newSidebarView)),
  getdashboardInfoData: val => dispatch(getdashboardInfoData(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContent);
