import axios from 'axios';
import { reset } from 'redux-form';
import { authLoader } from './loaders_action';
import { setProfileData, setUserPhoto } from './profile_actions';
import { config } from '../../env';
import {
  SIGN_UP_CONFIRM_MAIL_MESSAGE,
  SET_EMAIL,
  HANDLE_CHECK_USER,
  SUCCESS_RECOVER_PASS_MSG,
  SET_HASH_FOR_NEW_PASS,
  SET_ORCID_DATA,
  SET_ORCID_CODE,
  HANDLE_ERROR_MSG_NEWPASS,
  SUCCESS_NEW_PASS_MSG,
} from '../constants';
import history from '../history';
import { createNotification } from './notifications_action';

axios.defaults.withCredentials = true;


const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

export const succesConfirmMessage = payload => ({
  type: SIGN_UP_CONFIRM_MAIL_MESSAGE,
  payload,
});

export const setEmail = payload => ({
  type: SET_EMAIL,
  payload,
});

export const checkUser = payload => ({
  type: HANDLE_CHECK_USER,
  payload,
});

export const setSuccessRecoverMsg = payload => ({
  type: SUCCESS_RECOVER_PASS_MSG,
  payload,
});

export const setHashForNewPass = payload => ({
  type: SET_HASH_FOR_NEW_PASS,
  payload,
});
export const setOrcidData = payload => ({
  type: SET_ORCID_DATA,
  payload,
});

export const setOrcidCode = payload => ({
  type: SET_ORCID_CODE,
  payload,
});

export const errorMsgNewPassData = payload => ({
  type: HANDLE_ERROR_MSG_NEWPASS,
  payload,
});

export const successNewPassMsg = payload => ({
  type: SUCCESS_NEW_PASS_MSG,
  payload,
});

export const setUser = data => (dispatch) => {
  dispatch(setProfileData(data));
  localStorage.setItem('userAvatar', data.avatar ? data.avatar : '');
  localStorage.setItem('given_name', data.given_name ? data.given_name : '');
  localStorage.setItem('family_name', data.family_name ? data.family_name : '');
  localStorage.setItem('fullName', `${localStorage.getItem('family_name')} ${localStorage.getItem('given_name')}`);
  localStorage.setItem('orcid', data.orcid ? data.orcid : '');
  if (data.redirect_url) {
    return window.location.href = data.redirect_url;
  } else history.replace('/dashboard');
};

export const signup = (data, cookies) => (dispatch) => {
  dispatch(authLoader(true));
  axios.post(`${config.API_URL}users/signup/`, data, headers)
    .then((response) => {
      dispatch(authLoader(false));
      dispatch(reset('signUpForm'));
      dispatch(succesConfirmMessage(true));
      dispatch(setEmail(response.data.email));
    })
    .catch((err) => {
      dispatch(authLoader(false));
      if (err && err.response.status === 400) {
        createNotification('error', 'This email address is already being used.');
      }
    });
};

export const login = data => (dispatch) => {
  dispatch(authLoader(true));
  axios.post(`${config.API_URL}users/login/`, data, headers)
    .then((res) => {
      dispatch(authLoader(false));
      dispatch(setUserPhoto(res.data.avatar));
      dispatch(checkUser(true));
      dispatch(reset('loginForm'));
      dispatch(setUser(res.data));
    })
    .catch((err) => {
      dispatch(authLoader(false));
      if (err && err.response.status === 404) {
        createNotification('error', 'Sorry, entered email and password do not match.');
      } else if (err && err.response.status === 400) {
        createNotification('error', 'Your email is unconfirmed. Please follow the link in the received Confirmation email.');
      }
    });
};

export const forgotPassword = data => (dispatch) => {
  dispatch(authLoader(true));
  dispatch(setEmail(data.email));
  axios.post(`${config.API_URL}users/reset_password/`, data, headers)
    .then((response) => {
      dispatch(authLoader(false));
      dispatch(reset('forgotPasswordForm'));
      dispatch(setSuccessRecoverMsg(true));
    })
    .catch((err) => {
      dispatch(authLoader(false));
      createNotification('error', 'Entered email is not registered in the system. Please, try again');
    });
};

export const checkHashForNewPass = hash => (dispatch) => {
  axios.get(`${config.API_URL}users/new_password/${hash}/`, {}, headers)
    .then((response) => {
      if (response.data && response.data.success) {
        dispatch(setHashForNewPass(hash));
        history.push('/newpass');
      } else if (response.data && response.data.message) {
        history.push('/login');
        createNotification('warning', 'You have already used this recover password link.');
      }
    });
};

export const newPass = (hash, data) => (dispatch) => {
  dispatch(authLoader(true));
  axios.post(`${config.API_URL}users/new_password/${hash}/`, data, headers)
    .then((response) => {
      dispatch(authLoader(false));
      dispatch(reset('newPassFrom'));
      dispatch(errorMsgNewPassData(false));
      dispatch(successNewPassMsg(true));
    })
    .catch((err) => {
      dispatch(authLoader(false));
      dispatch(errorMsgNewPassData(true));
    });
};

export const setToken = (data) => {
  localStorage.setItem('token', data);
};
export const logOut = (cookies) => {
  headers.headers['X-CSRFToken'] = cookies.get('csrftoken');
  axios.post(`${config.API_URL}users/logout/`, {}, headers)
    .then((response) => {
      localStorage.clear();
      window.location.replace('/login');
    })
    .catch((err) => {

    });
};

export const getUserWithHash = data => (dispatch) => {
  axios.get(`${config.API_URL}users/email_verification/${data}/`)
    .then((response) => {
      if (response.data && response.data.message) {
        createNotification('success', 'Your account was already successfully activated.');
        history.replace('/dashboard');
      } else {
        dispatch(setUser(response.data));
        createNotification('success', 'Thank you! Your account was successfully activated.');
      }
    })
    .catch((err) => {
      if (err && err.response.status === 404) {
        createNotification('error', 'Activation link is incorrect');
        history.replace('/');
      }
    });
};

export const getUserWithOrcidCode = data => (dispatch) => {
  axios.post(`${config.API_URL}users/orcid/login/`, data, headers)
    .then((response) => {
      if (response.status === 200) {
        dispatch(setUser(response.data));
      }
      if (response.status === 202) {
        setToken(response.data.token);
        history.push('/orcid-login');
      }
    })
    .catch((err) => {
      // if (err && err.response.status === 400) {
      //   createNotification('error', "Activation code is incorrect")
      // } else if (err && err.response.status === 401) {
      //   createNotification('error', "Your email is unconfirmed. Please follow the link in the received Confirmation email.")
      // } else {
      console.log(err);
      history.replace('/login');
      // }
    });
};

export const getOrcidUserWithMail = (data, token) => (dispatch) => {
  dispatch(setEmail(data.email));
  headers.headers['X-Token'] = token;
  axios.post(`${config.API_URL}users/orcid/associate/`, data, headers)
    .then((response) => {
      dispatch(succesConfirmMessage(true));
    })
    .catch((err) => {
      if (err) {
        createNotification('error', 'Something was wrong');
      }
    });
};

export const getUserWithToken = token => (dispatch) => {
  headers.headers['X-Token'] = token;
  axios.post(`${config.API_URL}users/email/verify/`, {}, headers)
    .then((response) => {
      dispatch(setUser(response.data));
      createNotification('success', 'Thank you! Your account was successfully activated.');
    })
    .catch((err) => {
      if (err && err.response && err.response.data) {
        history.push('/login');
        createNotification('error', 'Your account was already successfully activated.');
      } else {
        createNotification('error', 'Something was wrong');
      }
    });
};

export const getUserWithTokenConfirmNewMail = token => (dispatch) => {
  headers.headers['X-Token'] = token;
  axios.post(`${config.API_URL}users/profile/email/verify/`, {}, headers)
    .then((response) => {
      dispatch(setUser(response.data));
      createNotification('success', 'Thank you! Your email was successfully activated.');
    })
    .catch((err) => {
      createNotification('error', 'Something was wrong');
    });
};
