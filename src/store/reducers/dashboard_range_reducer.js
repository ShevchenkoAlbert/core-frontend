import {
  CHANGE_DATE_FILTER_START,
  CHANGE_DATE_FILTER_END,
  CHANGE_DATE_RANGE_START,
  CHANGE_DATE_RANGE_END,
} from '../constants';
import { getDateStr, getDaysEgo } from '../../helpers';

export const initialState = {
  // dateFilterStart: new Date( new Date().setDate(new Date().getDate() - 90) ),
  dateFilterStart: getDateStr(getDaysEgo(90)),
  dateFilterEnd: '0',
  dateRangeStart: null,
  dateRangeEnd: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case CHANGE_DATE_FILTER_START:
    return { ...state, dateFilterStart: payload };

  case CHANGE_DATE_FILTER_END:
    return { ...state, dateFilterEnd: payload };

  case CHANGE_DATE_RANGE_START:
    return { ...state, dateRangeStart: payload };

  case CHANGE_DATE_RANGE_END:
    return { ...state, dateRangeEnd: payload };

  default:
    return state;
  }
};
