import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { scaleLinear } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';
import FORCE from './force';
import { bubbleRadius } from '../../../helpers';


class Node extends Component {
  componentDidMount() {
    const { data } = this.props;
    /* eslint-disable-next-line */
    const d3Node = d3.select(ReactDOM.findDOMNode(this))
      .datum(data)
      .call(FORCE.enterNode);
  }

  onClick(data) {
    const { desc } = this.props;
    desc(data);
  }

  render() {
    const {
      data,
      maxValue,
    } = this.props;

    const radius = bubbleRadius(data.count, maxValue);

    const fontSize = radius < 60
      ? radius < 30
        ? '8px'
        : '10px'
      : '16px';

    const fontFactor = radius < 60
      ? radius < 30
        ? 3.5
        : 4.4
      : 4.8;

    const textStyle = {
      fontSize: fontSize,
      transform: 'translateZ(0px)',
      fill: 'rgb(100, 100, 100)',
      fontWeight: '600',
      fontFamily: 'Roboto, sans-serif',
      textTransform: 'uppercase',
      textAnchor: 'middle',
      alignmentBaseline: 'middle',
    };

    const colorScale = scaleLinear()
      .domain([0, maxValue])
      .range(['#34FFF3', '#26BCB3'])
      .interpolate(interpolateLab);


    return (
      <g className="node">
        <circle
          r={`${radius}px`}
          onClick={() => this.onClick(data)}
          className="active"
          style={{ fill: colorScale(data.count), stroke: colorScale(data.count) }}
        />

        <text onClick={() => this.onClick(data)} style={textStyle}>
          <tspan style={{ maxWidth: data.count }}>
            {`${data.name}`}
          </tspan>
        </text>

      </g>
    );
  }
}

Node.propTypes = {
  desc: PropTypes.func.isRequired,
  maxValue: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default Node;
