import {
  CHANGE_SIDEBAR_VIEW,
  SET_LINK_DATA,
  SET_DASHBOARD_INFO_DATA,
  SET_CHART_DATA,
  SET_KEYWORDS_DATA,
  SET_CITATIONS_DATA,
} from '../constants';

export const initialState = {
  sidebar_view: true,
  link_data: [],
  keywordName: '',
  infoData: {},
  chartData: [],
  keywordData: [],
  citationsData: {
    mag_citations_count: 0,
    given: 0,
    received: 0,
    total: 0,
  },
  shares: 0,
  downloads: 0,
  PoE: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case CHANGE_SIDEBAR_VIEW:
    return { ...state, sidebar_view: action.payload };
  case SET_LINK_DATA:
    return {
      ...state,
      link_data: action.payload.artifacts,
      keywordName: action.payload.name,
    };
  case SET_KEYWORDS_DATA:
    return {
      ...state,
      keywordData: action.payload,
    };
  case SET_CITATIONS_DATA:
    return {
      ...state,
      citationsData: {
        mag_citations_count: action.payload.mag_citations_count,
        given: action.payload.given,
        received: action.payload.received,
        total: action.payload.total,
      },
    };
  case SET_DASHBOARD_INFO_DATA:
    return { ...state, infoData: action.payload };
  case SET_CHART_DATA:
    return { ...state, chartData: action.payload };
  default:
    return state;
  }
};
