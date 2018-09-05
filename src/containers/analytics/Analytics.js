import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import Analitycs from '../../components/analytics';

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch, props) => ({
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Analitycs));
