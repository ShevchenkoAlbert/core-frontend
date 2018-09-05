import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import Transactions from '../../components/transactions';

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch, props) => ({
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Transactions));
