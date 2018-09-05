import React, { Component } from 'react';
import CustomScroll from 'react-custom-scroll';
import 'react-custom-scroll/dist/customScroll.css';
import { CSSTransition } from 'react-transition-group';

import ArrowButton from './ArrowButton';


class CustomScrollComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowArrow: false,
      scrollTop: undefined,
    };
  }

  checkScroll(e) {
    if(!this.props.showScrollBtn) return;

    const contentHeight = +window.getComputedStyle(e.target).height.replace('px', '');

    if (e.target.scrollTop > contentHeight) {

      if (!this.state.isShowArrow) {
        this.setState({
          isShowArrow: true,
          scrollTop: e.target.scrollTop,
        });
      }

    } else {

      if (this.state.isShowArrow) {
        this.setState({
          isShowArrow: false,
          scrollTop: e.target.scrollTop,
        });
      }
    }
  }

  scrollToTop() {
    this.setState({
      scrollTop: 0,
    });
  }

  render() {
    return (
      <CustomScroll
        heightRelativeToParent="100%"
        minScrollHandleHeight={15}
        scrollTo={this.state.scrollTop}
        onScroll={(a) => this.checkScroll(a)}
        {...this.props}
      >
        {this.props.children}
        {
          this.props.showScrollBtn
            ? (
              <CSSTransition
                in={this.state.isShowArrow}
                timeout={600}
                classNames="scroll-btn"
                unmountOnExit
              >
                {state => (
                  <ArrowButton
                    onClick={() => this.scrollToTop()}
                    className={`${this.props.scrollBtnClass || ''}`}
                  />
                )}
              </CSSTransition>
            )
            : null
        }
      </CustomScroll>
    );
  };
}

export default CustomScrollComp;