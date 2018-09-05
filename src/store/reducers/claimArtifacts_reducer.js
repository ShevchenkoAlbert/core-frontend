import {
  FETCH_CLAIM_ARTIFACTS,
  FETCHING_CLAIM_ARTIFACTS_START,
  FETCHING_CLAIM_ARTIFACTS_END,
  UPDATE_ACTIVE_CLAIM_ARTIFACTS,
  CHANGE_POPUP_VIEW,
  SUBMIT_CLAIM_START,
  SUBMIT_CLAIM_END,
  SET_MY_CLAIMED_ARTIFACTS,
  RESET_POPUP_CHANGES,
  START_LOADING,
  STOP_LOADING,
  SET_UPDATE_DATE,
  SORT_TYPE,
  SET_PAGE,
  CHECK_LOAD,
  CLEAR_MY_CLAIMED_ARTIFACTS,
  SET_TOTAL_PAGES,
  SET_TOTAL_CLAIMED_ARTIFACTS,
} from '../constants';


const initialState = {
  contributors: {},
  fetching: false,
  popupView: null,
  submitingClaimArtifacts: false,
  myClaimedArtifacts: [],
  dataLoading: true,
  lastUpdateDate: '',
  sortType: {
    sort: 'title',
    type_sort: 'ASC',
  },
  page: 1,
  totalPages: 1,
  totalClaimedArifacts: 0,
  isLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case SORT_TYPE:
    return {
      ...state,
      sortType: {
        sort: payload.sort,
        type_sort: payload.type_sort,
      },
    };
  case CHECK_LOAD:
    return { ...state, isLoading: payload };
  case SET_PAGE:
    return { ...state, page: payload };
  case START_LOADING:
    return { ...state, dataLoading: payload };
  case STOP_LOADING:
    return { ...state, dataLoading: payload };
  case SUBMIT_CLAIM_START:
    return { ...state, submitingClaimArtifacts: payload };
  case SUBMIT_CLAIM_END:
    return { ...state, submitingClaimArtifacts: payload };
  case CHANGE_POPUP_VIEW:
    return { ...state, popupView: payload };
  case RESET_POPUP_CHANGES:
    console.log('payload', payload);
    return {
      ...state,
      contributors: {
        ...state.contributors,
        ...payload,
      },
    };
  case FETCHING_CLAIM_ARTIFACTS_START:
    return { ...state, fetching: payload };
  case FETCHING_CLAIM_ARTIFACTS_END:
    return { ...state, fetching: payload };
  case SET_MY_CLAIMED_ARTIFACTS:
    return { ...state, myClaimedArtifacts: state.myClaimedArtifacts.concat(payload) };
  case CLEAR_MY_CLAIMED_ARTIFACTS:
    return { ...state, myClaimedArtifacts: payload };
  case SET_UPDATE_DATE:
    return { ...state, lastUpdateDate: payload };
  case SET_TOTAL_PAGES:
    return { ...state, totalPages: payload };
  case SET_TOTAL_CLAIMED_ARTIFACTS:
    return { ...state, totalClaimedArifacts: payload };
  case FETCH_CLAIM_ARTIFACTS:
    return {
      ...state,
      contributors: payload,
      // artifacts: payload.artifacts,
    };
  case UPDATE_ACTIVE_CLAIM_ARTIFACTS:
    if (payload.artifact) {
      return {
        ...state,
        contributors: {
          ...state.contributors,
          [payload.contributorId]: {
            ...state.contributors[payload.contributorId],
            artifacts: {
              ...state.contributors[payload.contributorId].artifacts,
              [payload.artifactId]: {
                ...payload.artifact,
                notActive: !payload.checked,
              },
            },
          },
        },
      };
    } else if (payload.contributorId) {
      let artifacts = {};
      for (let artifactKey in state.contributors[payload.contributorId].artifacts) {
        artifacts[artifactKey] = {
          ...state.contributors[payload.contributorId].artifacts[artifactKey],
          notActive: !payload.checked,
        };
      }
      return {
        ...state,
        contributors: {
          ...state.contributors,
          [payload.contributorId]: {
            ...state.contributors[payload.contributorId],
            artifacts: artifacts,
          },
        },
      };
    } else {
      let contributors = {};
      for (let contributorKey in state.contributors) {
        let artifacts = {};
        for ( let artifactKey in state.contributors[contributorKey].artifacts ) {
          artifacts[artifactKey] = {
            ...state.contributors[contributorKey].artifacts[artifactKey],
            notActive: !payload.checked,
          };
        }
        contributors[contributorKey] = {...state.contributors[contributorKey]};
        contributors[contributorKey].artifacts = artifacts;
      }
      return {
        ...state,
        contributors: {
          ...state.contributors,
          ...contributors,
        },
      };
    }
  default:
    return state;
  }
};
