import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MainLoader from '../../loaders/MainLoader';
import { monthNames, changeLocationPath, initialSortHandler } from '../../../helpers';
import Footer from '../../common/Footer';
import TagList from './TagList';
import CustomScrollComp from '../../common/CustomScrollComp';
import InfiniteScrollOverride from '../../common/InfiniteScrollOverride';


class ArtifactsMyWorks extends Component {
  componentWillMount() {
    const {
      sortType,
      setPage,
      page,
      sortingProcess,
      clearMyArtifactsStore,
    } = this.props;
    const parsed = initialSortHandler('/artifacts/my-works/');
    clearMyArtifactsStore();
    if (!parsed) sortingProcess(sortType.sort, sortType.type_sort, 1);
    else {
      const { sort, type_sort, page: sort_page } = parsed;
      if (sort && type_sort && sort_page) {
        sortingProcess(sort, type_sort, sort_page);
        setPage(+sort_page);
      } else sortingProcess(sortType.sort, sortType.type_sort, page);
    }
  }

  sortChange = (sortVal) => {
    const {
      sortType,
      clearMyArtifactsStore,
      setPage,
      sortingProcess,
    } = this.props;
    clearMyArtifactsStore();
    setPage(1);
    if (sortType.type_sort === 'ASC') sortingProcess(sortVal, 'DESC', 1);
    else sortingProcess(sortVal, 'ASC', 1);
  }

    loadMore = () => {
      const {
        sortType,
        page,
        isLoading,
        sortingProcess,
      } = this.props;
      if (isLoading) return;
      sortingProcess(sortType.sort, sortType.type_sort, page);
    }

    render() {
      const {
        totalClaimedArifacts,
        totalPages,
        data,
        lastUpdateDate,
        sortType,
        page,
        isLoading,
      } = this.props;
      const date = new Date(lastUpdateDate);
      return (
      // @todo 'false' with indication data loading variable;
        <MainLoader active={false}>
          <CustomScrollComp showScrollBtn>
            <div className="scroll-container">
              <div className="ArtifactsPage__content ArtifactsPage__MyWorks">
                <InfiniteScrollOverride
                  pageStart={page}
                  loadMore={this.loadMore}
                  hasMore={page < totalPages}
                  loader={isLoading ? <MainLoader active key={0} /> : null}
                  initialLoad={false}
                  threshold={250}
                  useWindow={false}
                  scrollParent="inner-container"
                >

                  <div className="ArtifactsPage__content_head">
                    <p>
                      You have
                      {' '}
                      <span>
                        {totalClaimedArifacts}
                      </span>
                      {' '}
                      artifacts
                    </p>
                    { lastUpdateDate ? (
                      <p>
                        Last update
                        {' '}
                        <span>
                          {`${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
                        </span>
                      </p>
                    ) : (null)
                    }
                  </div>
                  <div className="ArtifactsMyWorks">
                    <div className="ArtifactsMyWorks__table">
                      <div className="ArtifactsMyWorks__tr ArtifactsMyWorks__tr--head">
                        {/* @todo className = active - sort method, className = top - sort flow */}
                        <div
                          className={classnames('ArtifactsMyWorks__th ArtifactsMyWorks__th--artifacts', {
                            'active': sortType.sort === 'title',
                            'top': sortType.type_sort === 'ASC' && sortType.sort === 'title',
                          })}
                          onClick={() => this.sortChange('title')}
                        >
                          <span>
                            <span>
                              ARTIFACTS
                            </span>
                            <span className="sort-arrow" />
                          </span>
                        </div>
                        <div className="ArtifactsMyWorks__th ArtifactsMyWorks__th--contributors">
                          <span>
                            CONTRIBUTORS
                          </span>
                        </div>
                        <div className="ArtifactsMyWorks__th ArtifactsMyWorks__th--keywords">
                          <span>
                          KEYWORDS
                          </span>
                        </div>
                        <div
                          className={classnames('ArtifactsMyWorks__th ArtifactsMyWorks__th--citations', {
                            'active': sortType.sort === 'citation_count',
                            'top': sortType.type_sort === 'ASC' && sortType.sort === 'citation_count',
                          })}
                          onClick={() => this.sortChange('citation_count')}
                        >
                          <span>
                            TOTAL CITATIONS
                            <span className="sort-arrow" />
                          </span>
                        </div>
                        {/* <div className="ArtifactsMyWorks__th ArtifactsMyWorks__th--proof">
                        <span>
                        PROOF OF EXISTENCE
                          <span className="sort-arrow" />
                        </span>
                      </div> */}
                      </div>
                      {
                        data.map((item, i) => (
                          <div className="ArtifactsMyWorks__tr" key={i}>
                            <div className="ArtifactsMyWorks__td ArtifactsMyWorks__td--artifacts">
                              <p>
                                {item.fields.title}
                              </p>
                              <span>
                                {item.fields.publication_year}
                              </span>
                            </div>
                            <div className="ArtifactsMyWorks__td ArtifactsMyWorks__td--contributors">
                              <p>
                                {
                                  item.contributors && item.contributors.map((elem, key) => (
                                    <span key={key}>
                                      {`${elem.given_name} ${elem.family_name}, `}
                                    </span>
                                  ))
                                }
                              </p>
                            </div>
                            <div className="ArtifactsMyWorks__td ArtifactsMyWorks__td--keywords">

                              <TagList tagList={item.keywords} key={i} />

                            </div>
                            <div className="ArtifactsMyWorks__td ArtifactsMyWorks__td--citations">
                              <p>
                                { item.fields.citation_count }
                              </p>
                            </div>
                            {/* <div className="ArtifactsMyWorks__td ArtifactsMyWorks__td--proof">
                            {
                              // @todo replace with right condition;
                              true || false
                                ? (
                                  <React.Fragment>
                                    <p>
                                      <a href={`${'???hash???'}`}>
                                      Hash
                                      </a>
                                    </p>
                                    <span>
                                    June 18, 2018
                                    </span>
                                  </React.Fragment>
                                )
                                : (
                                  <GradientButton
                                    className=""
                                    text="Transact"
                                    type="submit"
                                  />
                                )
                            }
                          </div> */}
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </InfiniteScrollOverride>
              </div>
              <Footer />
            </div>
          </CustomScrollComp>
        </MainLoader>
      );
    }
}

ArtifactsMyWorks.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  lastUpdateDate: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  sortType: PropTypes.instanceOf(Object).isRequired,
  setPage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  clearMyArtifactsStore: PropTypes.func.isRequired,
  sortingProcess: PropTypes.func.isRequired,
  totalClaimedArifacts: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default ArtifactsMyWorks;
