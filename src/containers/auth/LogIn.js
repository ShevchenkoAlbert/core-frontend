import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { login } from '../../store/actions/auth_action';
import LogIn from '../../components/auth/LogIn';

const mapStateToProps = state => ({
  authLoader: state.loaders_reducer.auth_loader,
  emailFieldVal: formValueSelector('loginFrom')(state, 'email'),
  rememberFieldVal: formValueSelector('loginFrom')(state, 'remember'),
  passwordFieldVal: formValueSelector('loginFrom')(state, 'password'),
});

const mapDispatchToProps = dispatch => ({
  login: value => dispatch(login(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
