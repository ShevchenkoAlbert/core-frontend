import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import CoreLoyautHeader from './CoreLoyautHeader';
import ClaimArtifactsPopup from '../../containers/artifacts/ClaimArtifactsPopup';
import FullScreenLoader from '../loaders/FullScreenLoader';
import HeaderMenuItem from '../common/HeaderMenuItem';
import ArtifactsProposed from './artifacts/ArtifactsProposed';
import ResearchRecords from './ResearchRecords';

import { countArtifactsOfContributors, countChoosenArtifacts } from '../../helpers';
import ArtifactsMyWorks from '../../containers/artifacts/ArtifactsMyWorks';


class ArtifactsContent extends Component {
  render() {
    const {
      sidebarState,
      changeClaimArtifact,
      popupView,
      submitClaimArtifacts,
      contributorsToClaim,
      isDataLoading,
      submitingClaimArtifacts,
    } = this.props;

    const allArtifacts = countArtifactsOfContributors(contributorsToClaim);
    const choosenArtifacts = countChoosenArtifacts(contributorsToClaim, allArtifacts);

    return (
      <section className="ArtifactsPage">
        <div className="CoreLoyautHeader ArtifactsPage__header">
          <CoreLoyautHeader
            changeSidebarView={this.props.changeSidebarView}
            sidebarState={this.props.sidebarState}
            title="Artifacts"
          >
            <nav className="ArtifactsPage__nav">
              <ul className="ArtifactsPage__nav_list">
                <HeaderMenuItem
                  key="Proposed"
                  linkUrl="/artifacts"
                  className=""
                  activeClassName="active"
                  exact
                >
                  Proposed
                </HeaderMenuItem>

                <HeaderMenuItem
                  key="My Works"
                  linkUrl="/artifacts/my-works"
                  className=""
                  activeClassName="active"
                >
                  My Works
                </HeaderMenuItem>

                <HeaderMenuItem
                  key="Research Records"
                  linkUrl="/artifacts/research-records"
                  className=""
                  activeClassName="active"
                >
                  Research Records
                </HeaderMenuItem>

              </ul>
            </nav>
          </CoreLoyautHeader>
        </div>
        <div className="CoreLoyaut__inner ArtifactsPage__inner">


          <Switch>
            <Route
              exact
              path="/artifacts"
              component={() => (
                <ArtifactsProposed
                  isDataLoading={isDataLoading}
                  allArtifacts={allArtifacts}
                  choosenArtifacts={choosenArtifacts}
                  sidebarState={sidebarState}
                  changeClaimArtifact={changeClaimArtifact}
                  submitClaimArtifacts={submitClaimArtifacts}
                  contributorsToClaim={contributorsToClaim}
                />
              )}
            />
            <Route
              path="/artifacts/my-works"
              component={ArtifactsMyWorks}
            />
            <Route
              path="/artifacts/research-records"
              component={ResearchRecords}
            />
          </Switch>


        </div>

        <CSSTransition
          classNames="popup-content"

          timeout={{ enter: 0, exit: 700 }}
          in={!!popupView}
          unmountOnExit
        >
          {() => (
            <ClaimArtifactsPopup />
          )}
        </CSSTransition>

        <FullScreenLoader active={submitingClaimArtifacts} />
      </section>
    );
  }
}


ArtifactsContent.propTypes = {
  sidebarState: PropTypes.bool.isRequired,
  changeSidebarView: PropTypes.func.isRequired,
  popupView: PropTypes.string,
  submitClaimArtifacts: PropTypes.func.isRequired,
  isDataLoading: PropTypes.bool.isRequired,
  submitingClaimArtifacts: PropTypes.bool.isRequired,
};

export default ArtifactsContent;
