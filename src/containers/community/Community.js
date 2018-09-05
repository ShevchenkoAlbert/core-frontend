import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import Community from '../../components/community';

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch, props) => ({
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Community));
