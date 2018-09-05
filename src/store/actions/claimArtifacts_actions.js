import axios from 'axios';

import { config } from '../../env';
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

import { arrayToObj, changeLocationPath } from '../../helpers';
import { createNotification } from './notifications_action';

const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

export const fetchClaimArtifacts = () => (dispatch) => {
  dispatch(fetchClaimArtifactsStart());

  axios.get(`${config.API_URL}users/claim/artifacts/`, headers)
    .then(res => res.data)
    .then((res) => {
      const contributors = arrayToObj(res, 'contrubutor_id');
      for (let key in contributors) {
        contributors[key].artifacts = arrayToObj(contributors[key].artifacts, 'id');
      }

      dispatch({
        type: FETCH_CLAIM_ARTIFACTS,
        payload: contributors,
      });
      dispatch(stopLoader());

      dispatch(fetchClaimArtifactsEnd());
    })
    .catch(e => createNotification('error', 'Something was wrong'));
};

export const fetchClaimArtifactsStart = () => ({
  type: FETCHING_CLAIM_ARTIFACTS_START,
  payload: true,
});

export const fetchClaimArtifactsEnd = () => {
  return {
    type: FETCHING_CLAIM_ARTIFACTS_END,
    payload: false,
  };
};


export const setMyClaimedArtifacts = payload => ({
  type: SET_MY_CLAIMED_ARTIFACTS,
  payload,
});

export const setLastUpdateDate = payload => ({
  type: SET_UPDATE_DATE,
  payload,
});

export const changeClaimArtifact = (contributor, checked, contributorId, artifactId) => (dispatch) => {

  if (artifactId) {
    dispatch(updateClaimArtifact(contributor, checked, contributorId, artifactId, contributor.artifacts[artifactId]));
  } else if (contributorId) {
    dispatch(updateClaimArtifact(contributor, checked, contributorId));
  } else {
    dispatch(updateClaimArtifact(null, checked));
  }
};

export const updateClaimArtifact = (contributor, checked, contributorId, artifactId, artifact) => ({
  type: UPDATE_ACTIVE_CLAIM_ARTIFACTS,
  payload: {
    contributorId,
    artifactId,
    contributor,
    artifact,
    checked,
  },
});


export const donePopupView = () => (dispatch) => {
  dispatch(changePopupView(null));
};

export const closePopupView = (contributorId, contributor) => (dispatch) => {
  dispatch(resetPopupChanges({
    [contributorId]: contributor,
  }));
  dispatch(changePopupView(null));
};

export const resetPopupChanges = payload => ({
  type: RESET_POPUP_CHANGES,
  payload,
});

export const changePopupView = payload => ({
  type: CHANGE_POPUP_VIEW,
  payload,
});

export const submitClaimArtifacts = (contributionToClaim, cookies) => (dispatch) => {
  dispatch(submitClaimStart());
  const claimData = [];
  for (const contributorKey in contributionToClaim) {
    const activeArtifacts = [];
    for (const artifactKey in contributionToClaim[contributorKey].artifacts) {
      if (!contributionToClaim[contributorKey].artifacts[artifactKey].notActive) {
        activeArtifacts.push(contributionToClaim[contributorKey].artifacts[artifactKey].id);
      }
    }

    if (activeArtifacts.length) {
      claimData.push({
        contributor: contributionToClaim[contributorKey].contrubutor_id,
        artifacts: activeArtifacts,
      });
    }
  }

  headers.headers['X-CSRFToken'] = cookies.get('csrftoken');
  axios.post(`${config.API_URL}users/claim/artifacts/`, { data: claimData }, headers)
    .then((response) => {
      dispatch(submitClaimEnd());
      dispatch(fetchClaimArtifacts());
    })
    .catch((error) => {
      dispatch(submitClaimEnd());
    });
};


export const submitClaimStart = () => ({
  type: SUBMIT_CLAIM_START,
  payload: true,
});

export const submitClaimEnd = () => ({
  type: SUBMIT_CLAIM_END,
  payload: false,
});

export const stopLoader = () => ({
  type: STOP_LOADING,
  payload: false,
});

export const startLoader = () => ({
  type: START_LOADING,
  payload: false,
});

export const setSortType = payload => ({
  type: SORT_TYPE,
  payload,
});

export const setPage = payload => ({
  type: SET_PAGE,
  payload,
});

export const checkLoading = payload => ({
  type: CHECK_LOAD,
  payload,
});

export const clearMyArtifactsStore = () => ({
  type: CLEAR_MY_CLAIMED_ARTIFACTS,
  payload: [],
});

export const setTotalPages = payload => ({
  type: SET_TOTAL_PAGES,
  payload,
});

export const setTotalClaimedArtifacts = payload => ({
  type: SET_TOTAL_CLAIMED_ARTIFACTS,
  payload,
});

export const sortingProcess = (sort, type_sort, page) => (dispatch) => {
  const url = `?sort=${sort}&type_sort=${type_sort}&page=${page}`;
  dispatch(checkLoading(true));
  axios.get(`${config.API_URL}users/artifacts/${url}`, headers)
    .then((response) => {
      dispatch(checkLoading(false));
      dispatch(setMyClaimedArtifacts(response.data.artifacts));
      dispatch(setLastUpdateDate(response.data.last_update));
      dispatch(setTotalClaimedArtifacts(response.data.count));
      dispatch(setTotalPages(response.data.count_pages));
      dispatch(setSortType({ sort, type_sort }));
      dispatch(setPage(+page+1));
      changeLocationPath(url);
    })
    .catch((err) => {
      dispatch(checkLoading(false));
      createNotification('error', 'Something was wrong');
    });
};
