import React, { Component } from 'react';
import { healthCall } from '../store/actions/health_action';

class HealthPage extends Component {
  componentDidMount() {
    healthCall();
  }

  render() {
    return (
      <div />
    );
  }
}

export default HealthPage;
