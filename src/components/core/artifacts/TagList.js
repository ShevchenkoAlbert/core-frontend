import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getItemsList } from '../../../helpers';


class TagList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowAll: false,
    };
  }

  getLinks = (isShowAll, i) => {
    return (
      !isShowAll
        ? (
          <span
            className="ArtifactsPage__contributor_tag link link--show-more"
            key={`${i}-link`}
            onClick={() => this.changeShowAll()}
          >
            show more
          </span>
        )
        : (
          <span
            className="ArtifactsPage__contributor_tag link link--show-less"
            key={`${i}-link`}
            onClick={() => this.changeShowAll()}
          >
            show less
          </span>
        )
    );
  };

  changeShowAll() {
    this.setState({
      isShowAll: !this.state.isShowAll,
    });
  }

  render() {
    const {
      tagList,
      i,
      defaultLength,
    } = this.props;

    const {
      isShowAll,
    } = this.state;


    const tags = isShowAll
      ? tagList
      : getItemsList(tagList, defaultLength);


    return (
      <React.Fragment>
        <div>
          {
            tags && tags.map((el, k) => (
              <span className="ArtifactsPage__contributor_tag" key={k}>
                {el.name}
              </span>
            ))
          }
        </div>

        {
          tagList.length > defaultLength
            ? this.getLinks(isShowAll, i)
            : null
        }
      </React.Fragment>
    );
  }
}


TagList.defaultProps = {
  defaultLength: 3,
  tagList: [],
};


TagList.propTypes = {
  defaultLength: PropTypes.number,
  tagList: PropTypes.array,
};


export default TagList;
