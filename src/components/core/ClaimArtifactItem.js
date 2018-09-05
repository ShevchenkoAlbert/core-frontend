import React, { Component } from 'react';

import CheckboxThreeView from '../../components/form/CheckboxThreeView';


class ClaimArtifactItem extends Component {

  render() {
    const {
      artifact,
      contributorId,
      onChange,
    } = this.props;

    return (
      <li className="ArtifactsPage__artifact">
        <p className="ArtifactsPage__artifact_name">
          <CheckboxThreeView
            checked={!artifact.notActive}
            defaultClassName=""
            notActiveClass=""
            ActiveClass=""
            FullActiveClass=""
            onChange={onChange}
            artifactId={artifact.id}
            contributorId={contributorId}
          />
          {artifact.title}
        </p>
        <p className="ArtifactsPage__artifact_text">
          {
            artifact.contibutors
              && artifact.contibutors.map((item, i, arr) => {
                return (<span key={i}>{`${item.family_name} ${item.given_name}, `}</span>);
              })
          }
          <span className='ArtifactsPage__artifact_publication-date'>
            {artifact.publication_year  ? artifact.publication_year : null}
          </span>
        </p>
      </li>
    )
  }
}


export default ClaimArtifactItem;
