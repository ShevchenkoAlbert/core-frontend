import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CheckboxThreeView from '../../components/form/CheckboxThreeView';
import ClaimArtifactItem from '../../components/core/ClaimArtifactItem';
import ContributorArtifactsHeader from '../../components/core/ContributorArtifactsHeader';

import { changeClaimArtifact, changePopupView } from '../../store/actions/claimArtifacts_actions';
import { selectFirsts, countContributorArtifact } from '../../helpers';


class ContributorArtifacts extends Component {
  render() {
    const {
      contributorId, contributor, changeClaimArtifact, changePopupView,
    } = this.props;

    if (!Object.keys(contributor.artifacts).length) return null;

    const { allArtifacts, choosenlength } = countContributorArtifact(contributor);

    return (
      <div className="ArtifactsPage__contributor">

        <ContributorArtifactsHeader
          contributor={contributor}
          contributorId={contributorId}
          choosenlength={choosenlength}
          allArtifacts={allArtifacts}
          onChangeClaims={changeClaimArtifact.bind(null, contributor)}
        />

        <ul className="ArtifactsPage__artifacts-list">

          {
            contributor.artifacts
              && selectFirsts(Object.keys(contributor.artifacts), 4)
                .map(
                  (id, i) =>
                    <ClaimArtifactItem
                      key={id}
                      contributorId={contributorId}
                      artifact={contributor.artifacts[id]}
                      onChange={changeClaimArtifact.bind(null, contributor)}
                    />
                )
          }

        </ul>
        <button
          className="ArtifactsPage__contributor_view-all"
          type="button"
          onClick={() => changePopupView(contributorId)}
        >
          View all
        </button>
      </div>
    );
  }
}

ContributorArtifacts.propTypes = {
  contributorId: PropTypes.string.isRequired,
  contributor: PropTypes.instanceOf(Object).isRequired,
  changeClaimArtifact: PropTypes.func.isRequired,
  changePopupView: PropTypes.func.isRequired,
}


const mapStateToProps = (state, props) => ({
  contributor: state.claim_artifacts_reducer.contributors[props.contributorId],
});

const mapDispatchToProps = (dispatch, props) => ({
  changeClaimArtifact: (contributor, checked, contributorId, artifactId) => dispatch(
    changeClaimArtifact(contributor, checked, contributorId, artifactId)
  ),
  changePopupView: (contributorId) => dispatch(changePopupView(contributorId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContributorArtifacts);
