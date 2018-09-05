import { AUTH_LOADER } from '../constants';

export const authLoader = payload => ({
  type: AUTH_LOADER,
  payload,
});
