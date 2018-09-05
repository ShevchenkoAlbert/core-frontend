import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Helmet from 'react-helmet';
import { NotificationContainer } from 'react-notifications';
import AuthLoyaut from './AuthLoyaut';
import InputField from '../form/InputField';

class ForgotPasswordForm extends Component {
  prepareForgotPassData = (data) => {
    const forgotPassData ={
      email: data.email,
    };
    return forgotPassData;
  }

  submitForgotPass = (e) => {
    const { forgotPassword } = this.props;
    const data = this.prepareForgotPassData(e);
    if (!data) {
      return;
    }
    forgotPassword(data);
  }

  render() {
    const {
      errorMsgNewPass,
      email,
      handleSubmit,
      successMsgForRecoverPass,
      emailFieldVal,
    } = this.props;

    const isValid = Object.getOwnPropertyNames(validate({
      email: emailFieldVal,
    })).length;

    return (
      <div className="forgot-page-wrapper">
        <Helmet>
          <title>
            ARTIFACTS | Forgot password
          </title>
        </Helmet>
        <NotificationContainer />
        <AuthLoyaut>
          { successMsgForRecoverPass
            ? (
              <div>
                <p>
                  {`Success! We've sent an email to ${email} with password reset instructions.`}
                </p>
                <p>
                  If the mail doesn&apos;t show up soon, check your spam folder. We sent it from&nbsp;
                  <a href="mailto:support@artifacts.com">
                    support@artifacts.com
                  </a>
                </p>
              </div>
            ) : (
              <div className="main-formSide auth__formSide_content">
                <h1 className="auth__formSide_title">
                  Reset Your Password
                </h1>
                <h3 className="auth__formSide_subtitle">
                  Fear not. We’ll email you instructions to reset your password. If you don’t have access to your email anymore, contact us via:&nbsp;
                  <a href="mailto:support@artifacts.ai">
                    support@artifacts.ai
                  </a>
                </h3>
                <form onSubmit={handleSubmit(this.submitForgotPass)} className="sign-form auth__form">
                  <Field
                    name="email"
                    component={InputField}
                    id="sign-up-email"
                    text="Enter your email (ex. myemail@mail.com)"
                    type="text"
                    placeholder="Enter Email"
                    label="Email"
                  />
                  <div className="auth__footer">
                    <div className="auth__footer_inner">
                      <button
                        className="btn-inner"
                        type="submit"
                        disabled={isValid}
                      >
                        Reset Password
                      </button>
                      <Link className="" to="/login">
                        Return to Log in
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            )
          }
        </AuthLoyaut>
      </div>
    );
  }
}

const validate = (values, props) => {
  const errors = {};
  // email
  if (!values.email) {
    errors.email = 'Please enter your email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email isn\'t valid';
  }
  return errors;
};

ForgotPasswordForm.defaultProps = {
  emailFieldVal: '',
};

ForgotPasswordForm.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  emailFieldVal: PropTypes.string,
  errorMsgNewPass: PropTypes.bool.isRequired,
  successMsgForRecoverPass: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

const ForgotPassword = reduxForm({
  form: 'forgotPasswordForm', // a unique name for this form
  validate,
})(ForgotPasswordForm);

export default ForgotPassword;
