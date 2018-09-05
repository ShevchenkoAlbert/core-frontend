import React from 'react';

import './MainLoader.scss';


const FullScreenLoader = props => {
  if (props.active) {
    return (
      <div className="Loader Loader-FullScreen">
        <div className="container">
          <div className="circle lg">
            <div className="circle md">
              <div className="circle sm">
                <div className="circle smlr">
                </div>
              </div>
            </div>
          </div>
          <span id="loading">Loading...</span>
        </div>
      </div>
    );
  } else {
    return null;
  }
};


export default FullScreenLoader;