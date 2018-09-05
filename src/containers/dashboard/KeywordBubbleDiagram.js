import { connect } from 'react-redux';
import 'react-custom-scroll/dist/customScroll.css';
import { setLinkArtifact } from '../../store/actions/core_actions';
import Bubble from '../../components/dashboard/BubbleDiagram';

const mapStateToProps = state => ({
  keywordName: state.core_reducers.keywordName,
  link_data: state.core_reducers.link_data,
  keywordData: state.core_reducers.keywordData,
});

const mapDispatchToProps = dispatch => ({
  setLinkArtifact: value => dispatch(setLinkArtifact(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bubble);
