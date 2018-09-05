import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition, transit } from 'react-transition-group';

import CheckboxThreeView from '../../components/form/CheckboxThreeView';
import { closePopupView, donePopupView, changeClaimArtifact } from '../../store/actions/claimArtifacts_actions';
import { countContributorArtifact } from '../../helpers';
import ClaimArtifactItem from '../../components/core/ClaimArtifactItem';
import GradientButton from '../../components/common/GradientButton';
import ArrowButton from '../../components/common/ArrowButton';
import CustomScrollComp from '../../components/common/CustomScrollComp';


class ClaimArtifactsPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originContributor: Object.assign({}, props.contributor),
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.contributor) return true;

    return false;
  }

  render() {
    const {
      popupView,
      changeClaimArtifact,
      contributor,
      closePopupView,
      donePopupView,
    } = this.props;

    const { allArtifacts, choosenlength } = countContributorArtifact(contributor);

    return (
      <div className="ClaimArtifactsPopup">

        <div
          className="ClaimArtifactsPopup__overlay"
          onClick={() => closePopupView(popupView, this.state.originContributor)}
        />

        <div className="ClaimArtifactsPopup__content">
          <div className="ArtifactsPage__contributor_head">
            <div className="ArtifactsPage__contributor_preview">
              <div className="ArtifactsPage__contributor_info">
                <p className="ArtifactsPage__contributor_name">
                  {
                    choosenlength > 0
                      ? (
                        choosenlength === allArtifacts
                          ? (
                            <CheckboxThreeView
                              defaultClassName=""
                              notActiveClass=""
                              ActiveClass="active"
                              FullActiveClass=""
                              onChange={(checked, contributorId, artifactId) => changeClaimArtifact(contributor, checked, contributorId, artifactId)}
                              checked
                              contributorId={popupView}
                            />
                          )
                          : (
                            <CheckboxThreeView
                              defaultClassName=""
                              notActiveClass=""
                              ActiveClass="active"
                              FullActiveClass=""
                              onChange={(checked, contributorId, artifactId) => changeClaimArtifact(contributor, checked, contributorId, artifactId)}
                              checked={false}
                              contributorId={popupView}
                            />
                          )
                      )
                      : (
                        <CheckboxThreeView
                          defaultClassName=""
                          notActiveClass=""
                          ActiveClass=""
                          FullActiveClass=""
                          onChange={(checked, contributorId, artifactId) => changeClaimArtifact(contributor, checked, contributorId, artifactId)}
                          checked={false}
                          contributorId={popupView}
                        />
                      )

                  }
                  {`${contributor.contributor.family_name} ${contributor.contributor.given_name}`}
                </p>
              </div>
              <span className="ArtifactsPage__contributor_tags-list">
                <span className="ArtifactsPage__contributor_tag">
biology
                </span>
                <span className="ArtifactsPage__contributor_tag">
chemistry
                </span>
                <span className="ArtifactsPage__contributor_tag">
biochemistry
                </span>
              </span>
            </div>
          </div>
          <div className="ClaimArtifactsPopup__scroll-wrapper">
            <CustomScrollComp
              showScrollBtn
            >
              <ul className="ArtifactsPage__artifacts-list">
                {
                  contributor.artifacts
                  && Object.keys(contributor.artifacts)
                    .map(
                      (id, i) => (
                        <ClaimArtifactItem
                          key={id}
                          contributorId={popupView}
                          artifact={contributor.artifacts[id]}
                          onChange={
                            (checked, contributorId, artifactId) => changeClaimArtifact(
                              contributor, checked, contributorId, artifactId
                            )
                          }
                        />
                      ),
                    )
                }
              </ul>
            </CustomScrollComp>
          </div>
          <div className="ClaimArtifactsPopup__bottom-panel">
            <p>
              <span>
                {choosenlength}
              </span>
              {' '}
of
              {' '}
              <span>
                {allArtifacts}
              </span>
              {' '}
artifacts selected
            </p>
            <div className="ClaimArtifactsPopup__bottom-panel_actions">
              <button
                className="ClaimArtifactsPopup__cancel"
                type="button"
                onClick={() => closePopupView(popupView, this.state.originContributor)}
              >
                Cancel
              </button>
              <GradientButton
                text="Done"
                onClick={() => donePopupView()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


ClaimArtifactsPopup.propTypes = {
  closePopupView: PropTypes.func.isRequired,
  donePopupView: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  popupView: state.claim_artifacts_reducer.popupView,
  contributor: state.claim_artifacts_reducer.contributors[state.claim_artifacts_reducer.popupView],
});

const mapDispatchToProps = (dispatch, props) => ({
  closePopupView: (contributorId, originContributor) => dispatch(closePopupView(contributorId, originContributor)),
  donePopupView: () => dispatch(donePopupView()),
  changeClaimArtifact: (contributor, checked, contributorId, artifactId) => dispatch(
    changeClaimArtifact(contributor, checked, contributorId, artifactId),
  ),
});


export default connect(mapStateToProps, mapDispatchToProps)(ClaimArtifactsPopup);
