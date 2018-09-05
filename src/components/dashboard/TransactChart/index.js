import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from './Chart';

class ResponsiveChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      containerWidth: null,
      POE: true,
      POA: false,
    };
    this.fitParentContainer = this.fitParentContainer.bind(this);
    // this.getDataForChart = this.getDataForChart.bind(this);
  }

  componentDidMount() {
    this.fitParentContainer();
    window.addEventListener('resize', this.fitParentContainer);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fitParentContainer);
  }

  // getDataForChart() {
  //   const { getDataForChartAction } = this.props;
  //   const { POA } = this.state;
  //   if (POA) {
  //     this.setState({ POA: false, POE: true }, () => getDataForChartAction('POE'));
  //   } else {
  //     this.setState({ POA: true, POE: false }, () => getDataForChartAction('POA'));
  //   }
  // }

  fitParentContainer() {
    const { containerWidth } = this.state;
    const currentContainerWidth = this.chartContainer.getBoundingClientRect().width;
    const shouldResize = containerWidth !== currentContainerWidth;
    if (shouldResize) {
      this.setState({
        containerWidth: currentContainerWidth,
      });
    }
  }


  renderChart() {
    const { containerWidth, POA, POE } = this.state;
    const { chartData } = this.props;
    const parentWidth = containerWidth;
    const data = chartData.slice(0, 9);
    return (
      <div>
        <div>
          <div className="chart_title">
            <h2 className="Dashboard__widget_title Dashboard__transacted-projects_title">
              Transacted projects and artifacts
            </h2>
            {/* <ul className="chart_buttons_contain">
                <li
                  className={POA ? 'active' : null}
                  onClick={this.getDataForChart}
                >
                  POA
                </li>
                <li
                  className={POE ? 'active' : null}
                  onClick={this.getDataForChart}
                >
                  POE
                </li>
              </ul> */}
          </div>
          <div className="chart__inner">
            {/* <div className="artifact_total_info">
              <p className="numbers">
                {chartData.total}
              </p>
              {
                POA ? (
                  <p className="description">
                    Poofs of attribution
                  </p>
                ) : (
                  <p className="description">
                    Proofs of existence
                  </p>
                )
              }
            </div> */}
            <Chart {...this.props} parentWidth={parentWidth} data={data} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { containerWidth } = this.state;
    const shouldRenderChart = containerWidth !== null;
    return (
      <div>
        <div
          ref={(el) => { this.chartContainer = el; }}
          className="Responsive-wrapper"
        >
          {shouldRenderChart && this.renderChart()}
        </div>
      </div>
    );
  }
}

ResponsiveChart.defaultProps = {
  parentWidth: 0,
};

ResponsiveChart.propTypes = {
  chartData: PropTypes.instanceOf(Array).isRequired,
  parentWidth: PropTypes.number,
};

export default ResponsiveChart;
