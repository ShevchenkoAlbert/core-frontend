import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-editor';
import PropTypes from 'prop-types';

import Slider from 'rc-slider';
import GradientButton from '../common/GradientButton';


export default class ProfileImage extends Component {
  state = {
    scale: 1,
  }

  onClick = (e) => {
    e.preventDefault();
    const { sendUserPhoto } = this.props;
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    sendUserPhoto(img);
  }


  setEditorRef = (editor) => {
    if (editor) this.editor = editor;
  }

  handleScale = (data) => {
    const { value } = data;
    const { scale } = this.state;

    const scaling = parseFloat(value);

    if (scaling === scale) return;

    this.setState({ scale: scaling });
  };

  render() {
    const { scale } = this.state;
    const {
      url,
      cancelChangePhoto,
    } = this.props;

    return (
      <div className="ProfileImage">
        <AvatarEditor
          className="ProfileImage__AvatarEditor"
          image={url}
          border={0}
          color={[0, 0, 0, 0.4]} // RGBA
          scale={scale}
          rotate={0}
          borderRadius={175}
          ref={this.setEditorRef}
        />
        <Slider
          min={1}
          max={2}
          step={0.01}
          defaultValue={1}
          handle={this.handleScale}
        />

        <div className="ProfileImage__actions">
          <button
            type="button"
            className="ProfileImage__cancel"
            onClick={cancelChangePhoto}
          >
            Cancel
          </button>

          <GradientButton
            text="Ok"
            onClick={this.onClick}
          />
        </div>
      </div>
    );
  }
}

ProfileImage.propTypes = {
  url: PropTypes.instanceOf(Object).isRequired,
  cancelChangePhoto: PropTypes.func.isRequired,
  sendUserPhoto: PropTypes.func.isRequired,
};
