import * as d3 from 'd3';
import ReactDOM from 'react-dom';

import { bubbleRadius } from '../../../helpers';


const FORCE = ((nsp = {}) => {
  let maxValue = 0;

  const getSize = () => ({
    width: window.innerWidth > 1024 ? 330 : window.innerWidth - 70,
    height: window.innerWidth > 1024 ? 385 : 310,
  });

  const initForce = (nodes, maxVal) => {
    maxValue = maxVal;

    nsp.force = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(1))
      .force('center', d3.forceCenter()
        .x(nsp.width /2)
        .y(nsp.height / 2)
      )
      .force('collide', d3.forceCollide((d) => {
        const radius = bubbleRadius(d.count, maxValue);

        if (radius > 80) return 0;
        return radius;
      }));
  };

  const enterNode = (selection) => {

    const circle = selection.select('circle')
      .transition()
      .duration(300)
      .style('stroke-width', '2px');

    const text = selection.select('text')
      .style('transform', 'translateZ(0)')
      .style('fill', 'rgba(100,100,100)')
      .style('font-weight', '600')
      .style('font-family', 'Roboto, sans-serif')
      .style('text-transform', 'uppercase')
      .style('text-anchor', 'middle')
      .style('alignment-baseline', 'middle');

    setTimeout(() => text.call(crop, circle), 10);
  };

  const crop = (text, circle) => {
    const circleRadius = circle.node().getBBox().width;

    while (text.node().getComputedTextLength() > circleRadius) {
      text.text(`${text.text().slice(0, -4)}...`);
    }
  };

  const updateNode = (selection) => {
    selection
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .attr('cx', (d) => {
        const radius = bubbleRadius(d.count, maxValue);

        d.x = Math.max(radius + 1, Math.min(nsp.width - (radius + 1), d.x));
      })
      .attr('cy', (d) => {
        const radius = bubbleRadius(d.count, maxValue);

        d.y = Math.max((radius + 1), Math.min(nsp.height - (radius + 1), d.y));
      });
  };

  const updateGraph = (selection) => {
    selection.selectAll('.node')
      .call(updateNode);
  };

  const dragStarted = (d) => {
    if (!d3.event.active) nsp.force.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  };

  const dragging = (d) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  };

  const dragEnded = (d) => {
    if (!d3.event.active) nsp.force.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  };

  const drag = () => {
    d3.selectAll('g.node')
      .call(d3.drag()
        .on('start', dragStarted)
        .on('drag', dragging)
        .on('end', dragEnded));
  };

  const tick = (that) => {
    try {
      /* eslint-disable-next-line */
      that.d3Graph = d3.select(ReactDOM.findDOMNode(that));
    } catch (e) {}
    nsp.force.on('tick', () => {
      that.d3Graph.call(updateGraph);
    });
  };

  nsp.width = getSize().width;
  nsp.height = getSize().height;
  nsp.enterNode = enterNode;
  nsp.updateNode = updateNode;
  nsp.updateGraph = updateGraph;
  nsp.initForce = initForce;
  nsp.dragStarted = dragStarted;
  nsp.dragging = dragging;
  nsp.dragEnded = dragEnded;
  nsp.drag = drag;
  nsp.tick = tick;

  return nsp;
})();

export default FORCE;
