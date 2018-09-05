import { AUTH_LOADER } from '../constants';

export const initialState = {
  auth_loader: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case AUTH_LOADER: {
    return { ...state, auth_loader: action.payload };
  }
  default:
    return state;
  }
};
