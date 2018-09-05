import React, { Component } from 'react';


import ContributorsList from '../../../containers/artifacts/ContributorsList';
import CheckboxThreeView from '../../form/CheckboxThreeView';
import MainLoader from '../../loaders/MainLoader';
import Footer from '../../common/Footer';
import CustomScrollComp from '../../common/CustomScrollComp';

export default class ArtifactsProposed extends Component {
  render() {
    const {
      isDataLoading,
      allArtifacts,
      choosenArtifacts,
      sidebarState,
      changeClaimArtifact,
      submitClaimArtifacts,
      contributorsToClaim,
    } = this.props;

    return (
      <MainLoader active={isDataLoading}>
        <CustomScrollComp
          showScrollBtn
          scrollBtnClass="ArrowButton__proposed"
        >
          <div className="ArtifactsPage__content ArtifactsPage__Proposed">

            <div className="ArtifactsPage__content_head">
              <p className="">
                <span>
                  {allArtifacts}
                </span>
                {' '}
                new artifacts were found!
              </p>
              <p>
                Claim yours by selecting groups of artifacts or individual items from a group
              </p>
            </div>

            <ContributorsList />

            <Footer />
          </div>

        </CustomScrollComp>

        <div className="claim-panel" style={{ width: `calc(100% - ${(sidebarState ? '350px': '100px')})` }}>
          {
            choosenArtifacts < allArtifacts
              ? (
                <label className="claim-panel__select">
                  {
                    choosenArtifacts === 0
                      ? (
                        <CheckboxThreeView
                          defaultClassName=""
                          notActiveClass=""
                          ActiveClass=""
                          FullActiveClass=""
                          onChange={changeClaimArtifact.bind(null, null)}
                          checked={false}
                        />
                      )
                      : (
                        <CheckboxThreeView
                          defaultClassName=""
                          notActiveClass=""
                          ActiveClass="active"
                          FullActiveClass=""
                          onChange={changeClaimArtifact.bind(null, null)}
                          checked={false}
                        />

                      )
                  }
                  <span className="claim-panel__select_text">
Select all
                  </span>
                </label>
              )
              : (
                <label className="claim-panel__select">
                  <CheckboxThreeView
                    defaultClassName=""
                    notActiveClass=""
                    ActiveClass="active"
                    FullActiveClass=""
                    onChange={changeClaimArtifact.bind(null, null)}
                    checked
                  />
                  <span className="claim-panel__select_text">
Unselect all
                  </span>
                </label>
              )
          }
          <p className="claim-panel_text">
            <span>
              {choosenArtifacts}
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
          <button
            className="claim-panel_btn"
            type="submit"
            name="submit"
            onClick={() => submitClaimArtifacts(contributorsToClaim)}
          >
            <span>
              Claim as Mine
            </span>
          </button>
        </div>
      </MainLoader>
    );
  }
}
