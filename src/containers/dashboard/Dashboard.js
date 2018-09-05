import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import Dashboard from '../../components/dashboard/Dashboard';
import {
  getdashboardInfoData,
  setLinkArtifact,
  getKeywordsData,
  getCitationsData,
  getDataForChart,
} from '../../store/actions/core_actions';
import { getMyClaimedArtifacts } from '../../store/actions/claimArtifacts_actions';
import { logOut } from '../../store/actions/auth_action';

const mapStateToProps = state => ({
  sidebarState: state.core_reducers.sidebar_view,
  keywordData: state.core_reducers.keywordData,
});

const mapDispatchToProps = (dispatch, props) => ({
  getdashboardInfoData: val => dispatch(getdashboardInfoData(val)),
  setLinkArtifact: data => dispatch(setLinkArtifact(data)),
  getClaimedArtifacts: () => dispatch(getMyClaimedArtifacts()),
  getKeywordsData: () => dispatch(getKeywordsData()),
  getCitationsData: () => dispatch(getCitationsData()),
  getDataForChart: () => dispatch(getDataForChart()),
  /* eslint-disable-next-line */
  logOut: () => dispatch(() => logOut(props.cookies)),

});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
