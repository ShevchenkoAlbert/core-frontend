import InfiniteScroll from 'react-infinite-scroller';


class InfiniteScrollOverride extends InfiniteScroll {
  constructor(props) {
    super(props);
  }

  /**
   * We are overriding the getParentElement function to use a custom element as the scrollable element
   *
   * @param {any} el the scroller domNode
   * @returns {any} the parentNode to base the scroll calulations on
   *
   * @memberOf InfiniteScrollOverride
   */
  getParentElement(el) {
    if (this.props.scrollParent) {
      let target = el;

      while (target.tagName !== 'BODY') {
        if (target.classList.contains(this.props.scrollParent)) {
          return target;
        }
        target = target.parentNode;
      }
    }
    return super.getParentElement(el);
  }

  render() {
    return super.render();
  }
}

export default InfiniteScrollOverride;