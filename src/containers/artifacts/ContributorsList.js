import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContributorArtifacts from './ContributorArtifacts';


class ContributorsList extends Component {
  render() {
    const { contributorsToClaim } = this.props;

    return (
      <div className="ArtifactsPage__contributors-list">

        {
          contributorsToClaim
            && Object.getOwnPropertyNames(contributorsToClaim)
              .map((item, i) => (
                <ContributorArtifacts
                  key={item}
                  contributorId={item}
                />
              ))
        }
      </div>
    );
  }
}

ContributorsList.defaultProps = {
  contributorsToClaim: [],
};

ContributorsList.propTypes = {
  contributorsToClaim: PropTypes.instanceOf(Object),
};

const mapStateToProps = state => ({
  contributorsToClaim: state.claim_artifacts_reducer.contributors,
});

export default connect(mapStateToProps)(ContributorsList);
