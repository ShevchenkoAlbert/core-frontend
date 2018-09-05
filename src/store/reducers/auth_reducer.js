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

export const initialState = {
  confirm_message: false,
  email: '',
  isLogin: false,
  successMsgForRecoverPass: false,
  hashForNewPass: '',
  orcidData: '',
  orcidCode: '',
  errorMsgNewPass: false,
  successMsgForNewPass: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case SIGN_UP_CONFIRM_MAIL_MESSAGE: {
    return { ...state, confirm_message: action.payload };
  }
  case SET_EMAIL: {
    return { ...state, email: action.payload };
  }
  case HANDLE_CHECK_USER: {
    return { ...state, isLogin: action.payload };
  }
  case SUCCESS_RECOVER_PASS_MSG: {
    return { ...state, successMsgForRecoverPass: action.payload };
  }
  case SET_HASH_FOR_NEW_PASS: {
    return { ...state, hashForNewPass: action.payload };
  }
  case SET_ORCID_DATA: {
    return { ...state, orcidData: action.payload };
  }
  case SET_ORCID_CODE: {
    return { ...state, orcidCode: action.payload };
  }
  case HANDLE_ERROR_MSG_NEWPASS: {
    return { ...state, errorMsgNewPass: action.payload };
  }
  case SUCCESS_NEW_PASS_MSG: {
    return { ...state, successMsgForNewPass: action.payload };
  }
  default:
    return state;
  }
};
