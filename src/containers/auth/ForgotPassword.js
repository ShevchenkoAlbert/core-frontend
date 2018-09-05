import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { forgotPassword, errorMsgNewPassData } from '../../store/actions/auth_action';
import ForgotPassword from '../../components/auth/ForgotPassword';

const mapStateToProps = state => ({
  authLoader: state.loaders_reducer.auth_loader,
  successMsgForRecoverPass: state.auth_reducer.successMsgForRecoverPass,
  emailFieldVal: formValueSelector('forgotPasswordForm')(state, 'email'),
  errorMsgNewPass: state.auth_reducer.errorMsgNewPass,
  email: state.auth_reducer.email,
});

const mapDispatchToProps = dispatch => ({
  forgotPassword: value => dispatch(forgotPassword(value)),
  errorMsgNewPassData: value => dispatch(errorMsgNewPassData(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
