import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { NotificationContainer } from 'react-notifications';
import Helmet from 'react-helmet';
import AuthLoyaut from './AuthLoyaut';
import InputField from '../form/InputField';
import InputCheckbox from '../form/InputCheckbox';
import '../../../node_modules/react-notifications/lib/notifications.css';

class LogInViaOrcidForm extends Component {
  prepareOrcidData = (data) => {
    const orcidData = {
      email: data.email,
    };
    return orcidData;
  }

  submitOrcidData = (e) => {
    const { getOrcidUserWithMail } = this.props;
    const data = this.prepareOrcidData(e);
    if (!data) {
      return;
    }
    const token = localStorage.getItem('token');
    getOrcidUserWithMail(data, token);
  }

  render() {
    const {
      handleSubmit,
      emailSignUp,
      checkPrivacySignUp,
      successConfirmMessage,
      email,
    } = this.props;

    const isValid = Object.getOwnPropertyNames(validate({
      email: emailSignUp,
      checkPrivacy: checkPrivacySignUp,
    })).length;

    return (
      <div className="LogInViaOrcid-page-wrapper">
        <Helmet>
          <title>
            ARTIFACTS | Log in via Orcid
          </title>
        </Helmet>
        <AuthLoyaut>
          { successConfirmMessage
            ? (`Check your email! We’ve sent a message to ${email}. Open it up and click Activate Account. We’ll take it from there. `
            ) : (
              <div className="main-formSide auth__formSide_content">
                <p className="auth__formSide_highlightText">
                  Register Email
                </p>
                <h1 className="auth__formSide_title">
                  Log In via ORCID
                </h1>
                <h3 className="auth__formSide_subtitle">
                  Please enter your email to finalize the login. If you already have an ARTiFACTS account, this will link your ORCID profile with ARTiFACTS. If not, this will create a new account for you with your ORCID profile.
                </h3>
                <NotificationContainer />
                <form onSubmit={handleSubmit(this.submitOrcidData)} className="sign-form auth__form">
                  <Field
                    name="email"
                    component={InputField}
                    id="sign-up-email"
                    text="Enter your email (ex. myemail@mail.com)"
                    type="text"
                    placeholder="Enter Email"
                    label="Email"
                  />
                  <div className="auth__checkPrivacy">
                    <Field className="auth__checkPrivacy_input" name="checkPrivacy" component={InputCheckbox}>
                      <p className="auth__checkPrivacy_text">
                        I read and agree to
                        <Link to="/terms">
                          Participation agreement
                        </Link>
                        &nbsp;and
                        <Link to="/privacy">
                          Privacy Policy
                        </Link>
                        , including information on
                        <Link to="/cookie">
                          Cookie Use
                        </Link>
                        .
                      </p>
                    </Field>
                  </div>
                  <button
                    className="btn-inner"
                    type="submit"
                    disabled={isValid}
                  >
                    Get started
                  </button>
                </form>
              </div>
            )
          }
        </AuthLoyaut>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  // email
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email isn\'t valid';
  }

  if (!values.checkPrivacy) {
    errors.checkPrivacy = 'Required';
  }
  return errors;
};

LogInViaOrcidForm.defaultProps = {
  emailSignUp: '',
  checkPrivacySignUp: false,
};

LogInViaOrcidForm.propTypes = {
  getOrcidUserWithMail: PropTypes.func.isRequired,
  emailSignUp: PropTypes.string,
  successConfirmMessage: PropTypes.bool.isRequired,
  checkPrivacySignUp: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

const LogInViaOrcid = reduxForm({
  form: 'OcridLoginForm', // a unique name for this form
  validate,
})(LogInViaOrcidForm);

export default LogInViaOrcid;
