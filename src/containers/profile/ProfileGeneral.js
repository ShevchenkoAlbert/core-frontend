import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { withCookies } from 'react-cookie';
import {
  sendUpdateProfileData,
  getProfileData,
  setErrorMsgForPass,
  setUserPhoto,
  sendUserPhoto,
  handleShowCropingPhoto,
} from '../../store/actions/profile_actions';
import '../../../node_modules/react-notifications/lib/notifications.css';

import ProfileGeneralForm from '../../components/core/profile/ProfileGeneral';

const mapStateToProps = state => ({
  initialValues: state.profile_reducer.profileData,
  errorMsgForPass: state.profile_reducer.errorMsgForPass,
  userPhoto: state.profile_reducer.userPhoto,
  newPasswordProfile: formValueSelector('profile-general')(state, 'new_password'),
  oldPasswordProfile: formValueSelector('profile-general')(state, 'old_password'),
  profileFormState: state.form['profile-general'],
  showCropingPhoto: state.profile_reducer.showCropingPhoto,
});

const mapDispatchToProps = (dispatch, props) => ({
  /* eslint-disable */
  sendUpdateProfileData: (data) => dispatch(sendUpdateProfileData(data, props.cookies)),
  getProfileData: () => dispatch(getProfileData()),
  setErrorMsgForPass: val => dispatch(setErrorMsgForPass(val)),
  setUserPhoto: val => dispatch(setUserPhoto(val)),
  sendUserPhoto: file => dispatch(sendUserPhoto(file, props.cookies)),
  handleShowCropingPhoto: val => dispatch(handleShowCropingPhoto(val)),
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(ProfileGeneralForm));
