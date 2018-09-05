import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import AuthLoyaut from './AuthLoyaut';
import InputField from '../form/InputField';
import PasswordValidationInfo from './PasswordValidationInfo';
import NotificationMessageStatic from '../NotificationMessageStatic';
import {
  regPass,
  englishKeyboardLayout,
} from '../../store/constants';
import { validatePassword } from '../../helpers';

class NewPassForm extends Component {
  prepareNewPassData = (data) => {
    const newPassData ={
      password: data.newPassword,
    };
    return newPassData;
  }

  submitNewPass = (e) => {
    const { hashForNewPass, newPass } = this.props;
    const data = this.prepareNewPassData(e);
    if (data) newPass(hashForNewPass, data);
  }

  render() {
    const {
      errorMsgNewPass,
      successMsgForNewPass,
      handleSubmit,
      newPassword,
    } = this.props;

    const isValid = Object.getOwnPropertyNames(validate({
      newPassword,
    })).length;

    return (
      <div className="newpass-page-wrapper">
        <Helmet>
          <title>
            ARTIFACTS | Password reset
          </title>
        </Helmet>
        <AuthLoyaut>
          <div className="main-formSide auth__formSide_content">
            {
              successMsgForNewPass ? (
                <div>
                  <div>
                    Success! Your password has been updated
                  </div>
                  <br />
                  <Link to="/login" className="btn-inner">
                    Return to login
                  </Link>
                </div>
              ) : (
                <div>
                  <h1 className="auth__formSide_title">
                    Enter New Password
                  </h1>
                  <h3 className="auth__formSide_subtitle">
                    Almost done!
                    <br />
                    Enter your new password, and you&#8242;re good to go
                  </h3>
                  <form onSubmit={handleSubmit(this.submitNewPass)} className="newpass-form auth__form">
                    <div>
                      <Field
                        name="newPassword"
                        component={InputField}
                        id="newPassword"
                        text="Create your secure password"
                        type="password"
                        placeholder="Enter Password"
                        label="Password"
                        showPassValidation
                      />
                    </div>
                    {
                      validatePassword(newPassword)
                        ? (
                          <div className="auth__PasswordValidation">
                            <NotificationMessageStatic text="Your password is secure and you're all set!" />
                          </div>
                        )
                        : (
                          <div className="auth__PasswordValidation">
                            <PasswordValidationInfo passwordText={newPassword} />
                          </div>
                        )
                    }

                    <button
                      className="btn-inner"
                      type="submit"
                      disabled={isValid}
                    >
                      Reset Password
                    </button>

                  </form>
                </div>
              )
            }
          </div>
        </AuthLoyaut>
      </div>
    );
  }
}
const validate = (values) => {
  const errors = {};
  // password
  if (!values.newPassword) {
    errors.newPassword = true;
  } else if (!englishKeyboardLayout.test(values.newPassword)) {
    errors.newPassword = 'Please check that you use English keyboard layout and try again';
  } else if (!regPass.test(values.newPassword)) {
    errors.newPassword = true;
  }
  return errors;
};

NewPassForm.defaultProps = {
  newPassword: '',
};

NewPassForm.propTypes = {
  newPass: PropTypes.func.isRequired,
  newPassword: PropTypes.string,
  successMsgForNewPass: PropTypes.bool.isRequired,
  hashForNewPass: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMsgNewPass: PropTypes.bool.isRequired,
};

const NewPass = reduxForm({
  form: 'newPassForm', // a unique name for this form
  validate,
})(NewPassForm);

export default NewPass;
