import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { INIT_APP } from './_actions';
import loaders_reducer from './reducers/loaders_reducer';
import auth_reducer from './reducers/auth_reducer';
import core_reducers from './reducers/core_reducers';
import dashboard_range_reducer from './reducers/dashboard_range_reducer';
import claim_artifacts_reducer from './reducers/claimArtifacts_reducer';
import profile_reducer from './reducers/profile_reducer';

export const initialInit = {
  isFetching: 0,
};

export const init = (state = initialInit, action) => {
  switch (action.type) {
  case INIT_APP:
    return state;
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  init,
  loaders_reducer,
  auth_reducer,
  form: formReducer,
  core_reducers,
  dashboard_range_reducer,
  claim_artifacts_reducer,
  profile_reducer,
});

export default rootReducer;
