import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  oneLowerLetter,
  oneUpperLetter,
  oneNumbOrSpecial,
  minLength,
} from '../../store/constants';

export default class PasswordValidationInfo extends Component {
  render() {
    const { passwordText } = this.props;
    return (
      <div className="PasswordValidationInfo">
        <div className="PasswordValidationInfo__col">
          <div className={`PasswordValidationInfo__item${oneLowerLetter.test(passwordText) ? ' active' : ''}`}>
            <span />
            <p className="">
              Lowercase character
            </p>
          </div>
          <div className={`PasswordValidationInfo__item${oneUpperLetter.test(passwordText) ? ' active' : ''}`}>
            <span />
            <p className="">
              Uppercase character
            </p>
          </div>
        </div>

        <div className="PasswordValidationInfo__col">
          <div className={`PasswordValidationInfo__item${oneNumbOrSpecial.test(passwordText) ? ' active' : ''}`}>
            <span />
            <p className="">
              Special character or Number
            </p>
          </div>
          <div className={`PasswordValidationInfo__item${minLength.test(passwordText) ? ' active' : ''}`}>
            <span />
            <p className="">
              8 characters minimum
            </p>
          </div>
        </div>
      </div>
    );
  }
}

PasswordValidationInfo.defaultProps = {
  passwordText: '',
};
PasswordValidationInfo.propTypes = {
  passwordText: PropTypes.string,
};
