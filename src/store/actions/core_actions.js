import axios from 'axios';
import {
  CHANGE_SIDEBAR_VIEW,
  SET_LINK_DATA,
  SET_DASHBOARD_INFO_DATA,
  SET_CHART_DATA,
  SET_KEYWORDS_DATA,
  SET_CITATIONS_DATA,
} from '../constants';
import { data } from '../../mocks/mockDataForDashboard';
import { config } from '../../env';
import { accessErrorHandler } from '../../helpers';

const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

export const changeSidebarView = payload => ({
  type: CHANGE_SIDEBAR_VIEW,
  payload,
});

export const setLinkArtifact = payload => ({
  type: SET_LINK_DATA,
  payload,
});

export const setKeywordData = payload => ({
  type: SET_KEYWORDS_DATA,
  payload,
});

export const setDashboardInfo = payload => ({
  type: SET_DASHBOARD_INFO_DATA,
  payload,
});

export const setDataForChart = payload => ({
  type: SET_CHART_DATA,
  payload,
});

export const setCitationsdata = payload => ({
  type: SET_CITATIONS_DATA,
  payload,
});

export const getdashboardInfoData = id => (dispatch) => {
  const promise = new Promise(() => console.log(true));
  promise.then(
    dispatch(setDashboardInfo(data[id])),
  )
    .catch((err) => {
      console.log('error data');
    });
};

export const getDataForChart = () => (dispatch) => {
  axios.get(`${config.API_URL}users/fields-of-study/`, {}, headers)
    .then((response) => {
      dispatch(setDataForChart(response.data.data));
    })
    .catch((err) => {
      accessErrorHandler(err);
    });
};

export const getKeywordsData = () => (dispatch) => {
  axios.get(`${config.API_URL}users/keywords/`, {}, headers)
    .then((response) => {
      dispatch(setKeywordData(response.data.data));
    })
    .catch((err) => {
      accessErrorHandler(err);
    });
};

export const getCitationsData = () => (dispatch) => {
  axios.get(`${config.API_URL}users/citationscount/`, {}, headers)
    .then((response) => {
      dispatch(setCitationsdata(response.data.data));
    })
    .catch((err) => {
      accessErrorHandler(err);
    });
};
