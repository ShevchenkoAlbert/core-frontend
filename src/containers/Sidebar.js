import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import Sidebar from '../components/sidebar/Sidebar';
import { logOut } from '../store/actions/auth_action';
import { getProfileData } from '../store/actions/profile_actions';

const mapStateToProps = state => ({
  isSidebarOpen: state.core_reducers.sidebar_view,
  userName: state.profile_reducer.profileData,
  userPhoto: state.profile_reducer.userPhoto,
});

const mapDispatchToProps = (dispatch, props) => ({
  /* eslint-disable-next-line */
  logOut: () => dispatch(() => logOut(props.cookies)),
  getProfileData: () => dispatch(getProfileData()),
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
