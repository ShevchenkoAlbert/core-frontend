import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { getOrcidUserWithMail } from '../../store/actions/auth_action';
import LogInViaOrcid from '../../components/auth/LoginViaOrcid';
import '../../../node_modules/react-notifications/lib/notifications.css';

const mapStateToProps = state => ({
  authLoader: state.loaders_reducer.auth_loader,
  emailSignUp: formValueSelector('OcridLoginForm')(state, 'email'),
  checkPrivacySignUp: formValueSelector('OcridLoginForm')(state, 'checkPrivacy'),
  orcidData: state.auth_reducer.orcidData,
  orcidCode: state.auth_reducer.orcidCode,
  successConfirmMessage: state.auth_reducer.confirm_message,
  email: state.auth_reducer.email,
});

const mapDispatchToProps = dispatch => ({
  getOrcidUserWithMail: (orcidCode, data) => dispatch(getOrcidUserWithMail(orcidCode, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogInViaOrcid);
