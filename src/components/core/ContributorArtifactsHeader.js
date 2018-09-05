import React, { Component } from 'react';

import CheckboxThreeView from '../../components/form/CheckboxThreeView';

class ContributorArtifactsHeader extends Component {

  onChange(checked, contributorId, artifactId) {

    // if (choosenlength === allArtifacts) {

      this.props.onChangeClaims(checked, contributorId, artifactId)

    // } else if (choosenlength > 0) {
    //
    // } else {
    //
    // }
  }

  render() {
    const { onChange, contributorId, contributor, choosenlength, allArtifacts} = this.props;

    return (
      <div className="ArtifactsPage__contributor_head">

        <div className="ArtifactsPage__contributor_preview">
          <div className="ArtifactsPage__contributor_info">
            <p className="ArtifactsPage__contributor_name">
              {
                choosenlength > 0
                  ?
                    (
                      choosenlength === allArtifacts
                        ?
                          (
                            <CheckboxThreeView
                              defaultClassName=""
                              notActiveClass=""
                              ActiveClass="active"
                              FullActiveClass=""
                              onChange={this.onChange.bind(this)}
                              checked={true}
                              contributorId={contributorId}
                            />
                          )
                        :
                          (
                            <CheckboxThreeView
                              defaultClassName=""
                              notActiveClass=""
                              ActiveClass="active"
                              FullActiveClass=""
                              onChange={this.onChange.bind(this)}
                              checked={false}
                              contributorId={contributorId}
                            />
                          )
                    )
                  :
                    (
                      <CheckboxThreeView
                        defaultClassName=""
                        notActiveClass=""
                        ActiveClass=""
                        FullActiveClass=""
                        onChange={this.onChange.bind(this)}
                        checked={false}
                        contributorId={contributorId}
                      />
                    )

              }
              {contributor.contributor.family_name + ' ' + contributor.contributor.given_name}
            </p>
            <p className="ArtifactsPage__contributor_choosen">
              <span>{choosenlength}</span> of <span>{allArtifacts}</span> artifacts selected
            </p>
          </div>
          <span className="ArtifactsPage__contributor_tags-list">
            <span className="ArtifactsPage__contributor_tag">biology</span>
            <span className="ArtifactsPage__contributor_tag">chemistry</span>
            <span className="ArtifactsPage__contributor_tag">biochemistry</span>
          </span>
        </div>
      </div>
    )
  }
}


export default ContributorArtifactsHeader;
