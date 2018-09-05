import { connect } from 'react-redux';
import {
  setSortType,
  setPage,
  clearMyArtifactsStore,
  sortingProcess,
} from '../../store/actions/claimArtifacts_actions';

import ArtifactsMyWorks from '../../components/core/artifacts/ArtifactsMyWorks';


const mapStateToProps = state => ({
  data: state.claim_artifacts_reducer.myClaimedArtifacts,
  lastUpdateDate: state.claim_artifacts_reducer.lastUpdateDate,
  sortType: state.claim_artifacts_reducer.sortType,
  page: state.claim_artifacts_reducer.page,
  isLoading: state.claim_artifacts_reducer.isLoading,
  totalPages: state.claim_artifacts_reducer.totalPages,
  totalClaimedArifacts: state.claim_artifacts_reducer.totalClaimedArifacts,
});

const mapDispatchToProps = dispatch => ({
  setSortType: value => dispatch(setSortType(value)),
  setPage: val => dispatch(setPage(val)),
  clearMyArtifactsStore: () => dispatch(clearMyArtifactsStore()),
  sortingProcess: (sort, type_sort, page) => dispatch(sortingProcess(sort, type_sort, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtifactsMyWorks);
