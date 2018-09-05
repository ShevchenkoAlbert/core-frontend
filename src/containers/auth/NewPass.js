import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import NewPass from '../../components/auth/NewPass';
import { newPass } from '../../store/actions/auth_action';

const mapStateToProps = state => ({
  authLoader: state.loaders_reducer.auth_loader,
  hashForNewPass: state.auth_reducer.hashForNewPass,
  errorMsgNewPass: state.auth_reducer.errorMsgNewPass,
  successMsgForNewPass: state.auth_reducer.successMsgForNewPass,
  newPassword: formValueSelector('newPassForm')(state, 'newPassword'),
});

const mapDispatchToProps = dispatch => ({
  newPass: (hashForNewPass, data) => dispatch(newPass(hashForNewPass, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPass);
