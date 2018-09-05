import { connect } from 'react-redux';
import { changeSidebarView } from '../../store/actions/core_actions';
import { changeClaimArtifact } from '../../store/actions/claimArtifacts_actions';
import ArtifactsContent from '../../components/core/ArtifactsContent';

const mapStateToProps = state => ({
  sidebarState: state.core_reducers.sidebar_view,
  contributorsToClaim: state.claim_artifacts_reducer.contributors,
  popupView: state.claim_artifacts_reducer.popupView,
  isDataLoading: state.claim_artifacts_reducer.dataLoading,
  submitingClaimArtifacts: state.claim_artifacts_reducer.submitingClaimArtifacts,
});

const mapDispatchToProps = (dispatch, props) => ({
  changeSidebarView: newSidebarView => dispatch(changeSidebarView(newSidebarView)),
  changeClaimArtifact: (contributor, checked, contributorId, artifactId) => {
    dispatch(changeClaimArtifact(contributor, checked, contributorId, artifactId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtifactsContent);
