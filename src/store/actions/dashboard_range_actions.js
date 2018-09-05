import {
  CHANGE_DATE_FILTER_START,
  CHANGE_DATE_FILTER_END,
  CHANGE_DATE_RANGE_START,
  CHANGE_DATE_RANGE_END,
} from '../constants';
import { getdashboardInfoData } from './core_actions';

export const changeFilterDateStart = payload => ({
  type: CHANGE_DATE_FILTER_START,
  payload,
});

export const changeFilterDateEnd = payload => ({
  type: CHANGE_DATE_FILTER_END,
  payload,
});

export const changeRangeDateStart = payload => ({
  type: CHANGE_DATE_RANGE_START,
  payload,
});

export const changeRangeDateEnd = payload => ({
  type: CHANGE_DATE_RANGE_END,
  payload,
});

export const changeFilterDate = payload => (dispatch) => {
  const filterStart = payload.date.split('-')[0];
  const filterEnd = payload.date.split('-')[1];
  dispatch(
    changeFilterDateStart(filterStart),
  );
  dispatch(
    changeFilterDateEnd(filterEnd),
  );
  if (filterStart !== 'null' || filterEnd !== 'null') {
    dispatch(
      getdashboardInfoData(payload.id),
    );
  }
};

export const changeRangeDate = payload => (dispatch) => {
  const filterStart = payload.date.split('-')[0];
  const filterEnd = payload.date.split('-')[1];

  dispatch(
    changeRangeDateStart(filterStart),
  );
  dispatch(
    changeRangeDateEnd(filterEnd),
  );

  dispatch(
    changeFilterDate(payload),
  );
};
