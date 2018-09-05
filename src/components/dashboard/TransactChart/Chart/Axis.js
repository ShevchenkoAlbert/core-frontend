import React, { Component } from 'react';
import * as d3Axis from 'd3-axis';
import { select as d3Select } from 'd3-selection';
import PropTypes from 'prop-types';
import './Axis.css';

export default class Axis extends Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const {
      orient,
      tickSize,
      scale,
    } = this.props;

    const axisType = `axis${orient}`;
    const axis = d3Axis[axisType]()
      .scale(scale)
      .tickSize(-tickSize)
      .tickPadding([12])
      .ticks([4]);


    const el = d3Select(this.axisElement).call(axis);

    if (orient !== 'Bottom') return;

    const g = el.selectAll('g');
    g.selectAll('text')
      .call(wrap);


    function wrap(text, width = 104) {
      text.each(function() {
        width = 104;
        var text = d3Select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];

            if (text.selectAll('tspan').nodes().length >= 3 ) {
              tspan.text(`${tspan.text().slice(0, -3)}...`);
              return;
            }

            tspan = text
              .append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);

            width -= 10;
          }
        }
      });
    }
  }

  render() {
    const { orient, translate } = this.props;
    return (
      <g
        className={`Axis Axis-${orient}`}
        ref={(el) => { this.axisElement = el; }}
        transform={translate}
      />
    );
  }
}
Axis.propTypes = {
  orient: PropTypes.string.isRequired,
  translate: PropTypes.string.isRequired,
  scale: PropTypes.func.isRequired,
  tickSize: PropTypes.number.isRequired,
};
