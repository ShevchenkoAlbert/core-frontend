import { connect } from 'react-redux';
import { getDataForChart } from '../../store/actions/core_actions';
import ResponsiveChart from '../../components/dashboard/TransactChart';

const mapStateToProps = state => ({
  chartData: state.core_reducers.chartData,
  infoData: state.core_reducers.infoData,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveChart);
