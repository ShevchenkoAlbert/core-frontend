import axios from 'axios';
import { initialize } from 'redux-form';
import history from '../history';
import {
  SET_PROFILE_DATA,
  SET_ERR_MSG_FOR_PASS,
  SET_USER_PHOTO,
  HANDLE_CROP_PHOTO,
} from '../constants';
import { config } from '../../env';
import { dataURItoBlob, accessErrorHandler } from '../../helpers';
import { createNotification } from './notifications_action';

const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};
export const handleShowCropingPhoto = payload => ({
  type: HANDLE_CROP_PHOTO,
  payload,
});

export const setUserPhoto = payload => ({
  type: SET_USER_PHOTO,
  payload,
});

export const setProfileData = payload => ({
  type: SET_PROFILE_DATA,
  payload,
});

export const setErrorMsgForPass = payload => ({
  type: SET_ERR_MSG_FOR_PASS,
  payload,
});

export const getProfileData = () => (dispatch) => {
  axios.get(`${config.API_URL}users/profile/`, {}, headers)
    .then((response) => {
      dispatch(setProfileData(response.data.data));
      localStorage.setItem('given_name', response.data.data.given_name ? response.data.data.given_name : '');
      localStorage.setItem('family_name', response.data.data.family_name ? response.data.data.family_name : '');
      localStorage.setItem('fullName', `${localStorage.getItem('family_name')} ${localStorage.getItem('given_name')}`);
      dispatch(initialize('profile-general', response.data.data));
    })
    .catch((err) => {
      accessErrorHandler(err);
      history.push('/dashboard');
    });
};

export const sendUpdateProfileData = (data, cookies) => (dispatch) => {
  headers.headers['X-CSRFToken'] = cookies.get('csrftoken');
  axios.post(`${config.API_URL}users/profile/`, data, headers)
    .then((response) => {
      if (response.data && response.data.code === 200) {
        createNotification('success', 'All changes are successfully saved');
      } else if (response.data && response.data.code === 202) {
        createNotification(
          'success',
          'The Confirmation email has been sent to a new email. If you don\'t confirm a new email in 72 hours, the system will recover back your previous email',
        );
      } else if (response.data && response.data.code === 206) {
        createNotification('success', 'Password has been changed successfully');
      } else if (response.data && response.data.code === 208) {
        createNotification(
          'success',
          'The Confirmation email has been sent to a new email. If you don\'t confirm a new email in 72 hours, the system will recover back your previous email',
        );
        createNotification('success', 'Password has been changed successfully');
      }
      dispatch(getProfileData());
    })
    .catch((err) => {
      if (err && err.response && [400, 409].includes(err.response.status)) {
        dispatch(setErrorMsgForPass(true));
      }
      // createNotification('error', 'Something was wrong');
    });
};

export const sendUserPhoto = (data, cookies) => (dispatch) => {
  const file = new FormData();
  const blob = dataURItoBlob(data);
  file.append('picture', blob, 'avatar.jpg');
  const configHeader = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': cookies.get('csrftoken'),
      'Accept': 'application/json',
    },
  };
  axios.post(`${config.API_URL}users/profile/avatar/upload/`, file, configHeader)
    .then((res) => {
      localStorage.setItem('userAvatar', res.data.avatar);
      dispatch(setUserPhoto(res.data.avatar));
      dispatch(handleShowCropingPhoto(false));
    })
    .catch((err) => {
      accessErrorHandler(err);
      dispatch(handleShowCropingPhoto(false));
    });
};
