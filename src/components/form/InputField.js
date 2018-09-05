import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class InputField extends React.Component {
  constructor(props) {
    super();
    this.state = {
      show: false,
    };
  }

  changeVisiblePass = () => {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  };

  render() {
    const {
      input: {
        value, onChange, onBlur, onDragStart, onDrop, onFocus, name,
      },
      label,
      showLabel,
      labelStyle,
      id,
      type,
      placeholder,
      meta: { touched, error },
      showPassValidation,
      showMessageforChangeMail,
      maxLength,
      disabled,
      minLength,
      className,
      errorMsgForPass,
    } = this.props;
    const { show } = this.state;
    const inputTypeChange = show ? 'text' : 'password';
    return (
      <div className={`InputField ${className}`}>
        <label
          htmlFor={id}
          className={`InputField__label ${((touched && error) || errorMsgForPass) ? 'error' : ''} ${labelStyle || ''}`}
        >
          <input
            onChange={e => onChange(e)}
            // onChange={this.handleInputChange}
            onBlur={e => onBlur(e)}
            onDragStart={e => onDragStart(e)}
            onDrop={e => onDrop(e)}
            onFocus={e => onFocus(e)}
            value={value}
            name={name}
            placeholder={placeholder}
            id={id}
            disabled={disabled}
            maxLength={maxLength}
            minLength={minLength}
            type={type === 'password' ? inputTypeChange : type}
            className="inputs InputField__input"
            data-tip
            data-for={id}
          />
          {errorMsgForPass && (
            <div className="InputField__errorText">
              <span>
                Old password isn&apos;t correct, please check
              </span>
            </div>
          )}
          {
            showMessageforChangeMail
              ? (
                <span className="InputField__changeMail">
                  If you want to edit your Primary email, please contact us via
                  {' '}
                  <a href="mailto:support@artifacts.ai">
                  support@artifacts.ai
                  </a>
                </span>
              ) : null
          }
          {
            showLabel
              ? (
                <span className="InputField__label_text">
                  {label}
                </span>
              )
              : (null)
          }
          { type === 'password'
            && (
              <span className="show_hide InputField__eye" onClick={this.changeVisiblePass}>
                <i className={classnames('fa', {
                  'fa-eye-slash': show,
                  'fa-eye': !show,
                })}
                />
              </span>
            )
          }

          {
            (type !== 'password' || showPassValidation) && touched && error
            && (
              <span className="InputField__errorText">
                { error }
              </span>
            )}
        </label>
      </div>
    );
  }
}

InputField.defaultProps = {
  label: '',
  id: '',
  minLength: '',
  maxLength: '',
  showPassValidation: true,
  showLabel: false,
  labelStyle: '',
  className: '',
  disabled: false,
  showMessageforChangeMail: false,
  errorMsgForPass: false,
};

InputField.propTypes = {
  input: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  id: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  meta: PropTypes.instanceOf(Object).isRequired,
  showPassValidation: PropTypes.bool,
  maxLength: PropTypes.string,
  minLength: PropTypes.string,
  showLabel: PropTypes.bool,
  labelStyle: PropTypes.string,
  className: PropTypes.string,
  showMessageforChangeMail: PropTypes.bool,
  errorMsgForPass: PropTypes.bool,
};
