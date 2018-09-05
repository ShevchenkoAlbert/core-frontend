import React, { Component } from 'react';
import classnames from 'classnames';


export default class TextareaField extends Component {
  render() {
    const {
      input: {
        value, onChange, onBlur, onDragStart, onDrop, onFocus, name,
      },
      label,
      showLabel,
      labelStyle,
      id,
      placeholder,
      meta: { touched, error },
      maxLength,
      minLength,
    } = this.props;

    return (
      <div className="InputField">
        <label
          htmlFor={id}
          className={`InputField__label ${touched && error ? 'error' : ''} ${labelStyle || ''}`}
        >
          <textarea
            onChange={e => onChange(e)}
            onBlur={e => onBlur(e)}
            onDragStart={e => onDragStart(e)}
            onDrop={e => onDrop(e)}
            onFocus={e => onFocus(e)}
            value={value}
            name={name}
            placeholder={placeholder}
            id={id}
            maxLength={maxLength}
            minLength={minLength}
            className="inputs InputField__input"
            data-tip
            data-for={id}
          >
            {value}
          </textarea>
          {
            showLabel
              ? (
                <span className='InputField__label_text'>
                  {label}
                </span>
              )
              : (null)
          }
        </label>
        {
          touched && error
          && (
            <div className="InputField__errorText">
              <span>
                { error }
              </span>
            </div>
          )}
      </div>
    );
  }
}
