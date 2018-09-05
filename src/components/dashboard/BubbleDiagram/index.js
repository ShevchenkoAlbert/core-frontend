import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomScroll from 'react-custom-scroll';
import 'react-custom-scroll/dist/customScroll.css';
import Node from './NodeComponent';
import FORCE from './force';
import { sortToUpper } from '../../../helpers';

class Bubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNode: null,
      maxValue: 1,
    };
  }


  componentDidMount() {
    const { keywordData } = this.props;
    const { maxValue } = this.state;

    this.calcMaxValue();
    FORCE.initForce(keywordData, maxValue);
    FORCE.tick(this);
    FORCE.drag();
    window.addEventListener('resize', this.resize.bind(this));
  }


  componentDidUpdate(prevProps) {
    const { keywordData } = this.props;
    const { maxValue } = this.state;

    FORCE.initForce(keywordData, maxValue);
    FORCE.tick(this);
    FORCE.drag();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize.bind(this));
  }


  resize() {
    const { keywordData } = this.props;
    const { maxValue } = this.state;

    FORCE.initForce(keywordData, maxValue);
    FORCE.tick(this);
    FORCE.drag();
    this.setState();
  }


  filterNodes() {
    const { activeNode } = this.state;
    const { keywordData } = this.props;

    const newList = [].concat(keywordData);
    const sortedList = sortToUpper(newList, 'count').slice(-10);

    if (activeNode == null) return sortedList;

    for (let i = 0; i < sortedList.length; i++) {
      if (sortedList[i].id === activeNode) {
        sortedList.push(sortedList.splice(i, 1)[0]);
        return sortedList;
      }
    }
    return sortedList;
  }

  calcMaxValue() {
    const max = Math.max(...this.filterNodes().map(d => d.count));

    this.setState({
      maxValue: max,
    });
  }


  renderDescription = (data) => {
    const { setLinkArtifact } = this.props;
    this.setState({ activeNode: data.id });
    return setLinkArtifact(data);
  };

  render() {
    const { maxValue } = this.state;

    const filteredNodes = this.filterNodes();

    const { keywordName, link_data } = this.props;
    const nodes = filteredNodes.map(node => (
      <Node
        data={node}
        key={node.id}
        desc={this.renderDescription}
        maxValue={maxValue}
      />));

    return (
      <div className="graph__container Bubble">
        { nodes ? (
          <svg
            className="graph Bubble__svg"
            width="330px"
            height="385px"
          >
            <defs>
              <radialGradient id="Bubble-radial-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#03EFFE" />
                <stop offset="100%" stopColor="#027478" />
              </radialGradient>
            </defs>
            {nodes}
          </svg>
        ) : null
        }
        <div className="description Bubble__decription">
          <h2 className="Bubble__decription_title">
            { keywordName }
          </h2>
          <ul className="Bubble__decription_list">
            <CustomScroll heightRelativeToParent="100%" minScrollHandleHeight={15}>
              {
                link_data ? (link_data.map((link, i) => {
                  const li = (
                    <li className="Bubble__decription_item" key={i}>
                      { link.title }
                    </li>);
                  return li;
                })
                ) : (null)
              }
            </CustomScroll>
          </ul>
        </div>
      </div>
    );
  }
}


Bubble.propTypes = {
  setLinkArtifact: PropTypes.func.isRequired,
  keywordName: PropTypes.string.isRequired,
  link_data: PropTypes.instanceOf(Array).isRequired,
  keywordData: PropTypes.instanceOf(Array).isRequired,
};

export default Bubble;
