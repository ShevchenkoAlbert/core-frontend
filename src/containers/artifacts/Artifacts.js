import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import { fetchClaimArtifacts, submitClaimArtifacts, getMyClaimedArtifacts  } from '../../store/actions/claimArtifacts_actions';
import Artifacts from '../../components/core/Artifacts';

const mapStateToProps = state => ({
  sidebarState: state.core_reducers.sidebar_view,
});

const mapDispatchToProps = (dispatch, props) => ({
  /* eslint-disable-next-line */
  logOut: () => dispatch(() => logOut(props.cookies)),
  fetchClaimArtifacts: () => dispatch(fetchClaimArtifacts()),
  submitClaimArtifacts: contributionToClaim => dispatch(submitClaimArtifacts(contributionToClaim, props.cookies)),
  getMyClaimedArtifacts: () => dispatch(getMyClaimedArtifacts()),
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Artifacts));
