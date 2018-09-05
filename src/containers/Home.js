import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { logOut } from '../store/actions/auth_action';
import Home from '../components/core/Home';

const mapStateToProps = state => ({
  isLogin: state.auth_reducer.isLogin,
});

const mapDispatchToProps = (dispatch, props) => ({
  /* eslint-disable-next-line */
  logOut: () => dispatch(() => logOut(props.cookies)),
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Home));
