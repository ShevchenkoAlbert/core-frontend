import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import CoreLoyaut from './CoreLoyaut';
import Sidebar from '../../containers/Sidebar';
import ArtifactsContent from '../../containers/artifacts/ArtifactsContent';


class Artifacts extends Component {
  componentDidMount() {
    const { fetchClaimArtifacts } = this.props;
    fetchClaimArtifacts();
  }

  render() {
    const {
      popupView,
      submitClaimArtifacts,
      changeClaimArtifact,
    } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <title>
            ARTIFACTS | Artifacts
          </title>
        </Helmet>
        <CoreLoyaut
          sidebar={(
            <Sidebar
              name={localStorage.getItem('fullName')}
              userImage={null}
            />
          )}
        >
          <ArtifactsContent submitClaimArtifacts={submitClaimArtifacts} />
        </CoreLoyaut>
      </React.Fragment>
    );
  }
}

Artifacts.propTypes = {
  fetchClaimArtifacts: PropTypes.func.isRequired,
};

export default Artifacts;
