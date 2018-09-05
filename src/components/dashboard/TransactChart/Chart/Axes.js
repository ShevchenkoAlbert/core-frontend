import React from 'react';
import PropTypes from 'prop-types';
import Axis from './Axis';

const Axes = ({ scales, margins, svgDimensions }) => {
  const { height, width } = svgDimensions;

  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    translate: `translate(0, ${height - margins.bottom})`,
    tickSize: height - margins.top - margins.bottom,
  };

  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize: width - margins.left - margins.right,
  };

  return (
    <g>
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  );
};

Axes.propTypes = {
  margins: PropTypes.instanceOf(Object).isRequired,
  svgDimensions: PropTypes.instanceOf(Object).isRequired,
  scales: PropTypes.instanceOf(Object).isRequired,
};

export default Axes;
