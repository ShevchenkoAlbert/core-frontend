import {
  SET_PROFILE_DATA,
  SET_ERR_MSG_FOR_PASS,
  SET_USER_PHOTO,
  HANDLE_CROP_PHOTO,
} from '../constants';

export const initialState = {
  profileData: {
    given_name: localStorage.getItem('given_name') || '',
    family_name: localStorage.getItem('family_name') || '',
    email: '',
    additional_emails: [],
    public: false,
    description: '',
    old_password: '',
    new_password: '',
    created_month: null,
    created_year: null,
    password_old: '',
    password_new: '',
  },
  errorMsgForPass: false,
  userPhoto: localStorage.getItem('userAvatar') || null,
  showCropingPhoto: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case SET_PROFILE_DATA:
    return {
      ...state,
      profileData: {
        given_name: action.payload.given_name,
        family_name: action.payload.family_name,
        email: action.payload.email,
        additional_emails: action.payload.additional_emails,
        description: action.payload.description,
        public: action.payload.public,
        created_month: action.payload.created_month,
        created_year: action.payload.created_year,
        password_old: '',
        password_new: '',
      },
    };
  case SET_ERR_MSG_FOR_PASS:
    return { ...state, errorMsgForPass: action.payload };
  case SET_USER_PHOTO:
    return { ...state, userPhoto: action.payload };
  case HANDLE_CROP_PHOTO:
    return { ...state, showCropingPhoto: action.payload };
  default:
    return state;
  }
};
