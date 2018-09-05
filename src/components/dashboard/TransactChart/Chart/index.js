import React, { Component } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import PropTypes from 'prop-types';
import Axes from './Axes';
import Bars from './Bars';

class Chart extends Component {
  constructor() {
    super();
    this.xScale = scaleBand();
    this.yScale = scaleLinear();
  }

  render() {
    const { parentWidth, data } = this.props;
    const margins = {
      top: 50,
      right: 20,
      bottom: 100,
      left: 60,
    };
    const svgDimensions = {
      width: Math.max(parentWidth, 300) + 30, // minus marginRight in scss
      height: 500,
    };

    const maxValue = Math.max(...data.map(d => d.total));

    const xScale = this.xScale
      .padding(0.5)
      .domain(data.map(d => d.name))
      .range([margins.left, svgDimensions.width - margins.right]);

    const yScale = this.yScale
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top]);

    return (
      <svg
        className="Dashboard__transacted-projects_svg"
        width={svgDimensions.width}
        height={svgDimensions.height}
        style={{ maxWidth: 'calc(100% + 30px)' }}
      >
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
        />
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          data={data}
          maxValue={maxValue}
          svgDimensions={svgDimensions}
        />
      </svg>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  parentWidth: PropTypes.number.isRequired,
};

export default Chart;
