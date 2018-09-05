import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';
import PropTypes from 'prop-types';

export default class Bars extends Component {
  render() {
    const {
      scales,
      margins,
      data,
      maxValue,
      svgDimensions,
    } = this.props;
    const { xScale, yScale } = scales;
    const { height } = svgDimensions;

    const colorScale = scaleLinear()
      .domain([0, maxValue])
      .range(['#34FFF3', '#26BCB3'])
      .interpolate(interpolateLab);

    const bars = (
      data && data.map(datum => (
        <rect
          key={datum.id}
          x={xScale(datum.name)}
          y={yScale(datum.total)}
          height={height - margins.bottom - scales.yScale(datum.total)}
          width={xScale.bandwidth()}
          fill={colorScale(datum.total)}
        />
      ))
    );
    return (
      <g>
        {bars}
      </g>
    );
  }
}

Bars.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  margins: PropTypes.instanceOf(Object).isRequired,
  svgDimensions: PropTypes.instanceOf(Object).isRequired,
  scales: PropTypes.instanceOf(Object).isRequired,
  maxValue: PropTypes.number.isRequired,
};
