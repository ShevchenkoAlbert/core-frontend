import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { withCookies } from 'react-cookie';
import { signup } from '../../store/actions/auth_action';
import '../../../node_modules/react-notifications/lib/notifications.css';

import SignUp from '../../components/auth/SignUp';

const mapStateToProps = state => ({
  authLoader: state.loaders_reducer.auth_loader,
  successConfirmMessage: state.auth_reducer.confirm_message,
  email: state.auth_reducer.email,
  emailSignUp: formValueSelector('signUpForm')(state, 'email'),
  nameSignUp: formValueSelector('signUpForm')(state, 'name'),
  surnameSignUp: formValueSelector('signUpForm')(state, 'surname'),
  passwordSignUp: formValueSelector('signUpForm')(state, 'password'),
  checkPrivacySignUp: formValueSelector('signUpForm')(state, 'checkPrivacy'),
});

const mapDispatchToProps = (dispatch, props) => ({
  /* eslint-disable-next-line */
  signup: (data, log_data) => dispatch(signup(data, props.cookies)),
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(SignUp));
