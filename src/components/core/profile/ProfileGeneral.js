import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import {
  Field,
  FieldArray,
  reduxForm,
  SubmissionError,
} from 'redux-form';
import CustomScroll from 'react-custom-scroll';
import { createNotification } from '../../../store/actions/notifications_action';
import InputField from '../../form/InputField';
import InputCheckbox from '../../form/InputCheckbox';
import TextareaField from '../../form/TextareaField';
import FixedPanel from '../../common/FixedPanel';
import GradientButton from '../../common/GradientButton';
import Button from '../../common/Button';
import {
  regPass,
  englishKeyboardLayout,
} from '../../../store/constants';
import ProfileImage from '../../profile/ProfileImage';

import NotificationMessageStatic from '../../NotificationMessageStatic';
import PasswordValidationInfo from '../../auth/PasswordValidationInfo';
import { validImageTypes, validatePassword } from '../../../helpers';
import Footer from '../../common/Footer';


class ProfileGeneral extends Component {
  state = {
    urlPhoto: null,
  }

  onChange = (e) => {
    e.preventDefault();
    const { handleShowCropingPhoto } = this.props;
    let file;
    if (e.target) {
      const { target } = e;
      const { files } = target;
      file = files[0];
    }
    if (file && validImageTypes.includes(file.type)) {
      if (file.size <= (5242880)) {
        handleShowCropingPhoto(true);
        this.setState({
          urlPhoto: file,
        });
      } else {
        createNotification('warning', 'File is too big. Please, choose a smaller file (5 MB maximum)');
      }
    } else {
      createNotification('warning', 'Please use the following file formats: jpg, jpeg, png, gif');
    }
  };

  cancelChangePhoto = () => {
    const { handleShowCropingPhoto } = this.props;
    handleShowCropingPhoto(false);
  }

  prepareProfileData = (data) => {
    const profileData = {
      given_name: data.given_name,
      family_name: data.family_name,
      email: data.email,
      emails: data.additional_emails,
      profile: {
        description: data.description,
        public: data.public,
      },
      password_old: data.old_password || '',
      password_new: data.new_password || '',

    };
    return profileData;
  };

  submit = (values) => {
    if ((values.old_password && !values.new_password) || (values.new_password && !values.old_password)) {
      throw new SubmissionError({
        old_password: 'To change your password, please fill in old and new passwords',

      });
    } else {
      this.submitProfiledata(values);
    }
  }

  submitProfiledata = (e) => {
    const { sendUpdateProfileData } = this.props;
    const data = this.prepareProfileData(e);
    if (!data) {
      return;
    }
    sendUpdateProfileData(data);
  }

  render() {
    const {
      userPhoto,
      sidebarState,
      handleSubmit,
      reset,
      newPasswordProfile,
      errorMsgForPass,
      sendUserPhoto,
      showCropingPhoto,
      profileFormState,
    } = this.props;

    const { urlPhoto } = this.state;

    const LabelText = (text, subText) => (
      <React.Fragment>
        {text}
        <span className="subText">
          {subText}
        </span>
      </React.Fragment>
    );

    const renderEmails = ({ fields, meta: { touched, error, submitFailed } }) => {
      if (!fields.length) {
        return (
          <button
            type="button"
            className="ProfileGeneral__add-email"
            onClick={() => fields.push('')}
          >
            + Add more
          </button>
        );
      }
      return (
        fields.map((additionalEmails, index) => (
          <div className="ProfileGeneral__email-list" key={index}>
            <div className="row-for-button">
              <div className="additionalEmails-input">
                {
                  (fields.length > 0)
                  && (
                    <Field
                      name={`${additionalEmails}`}
                      id={`email${index}`}
                      component={InputField}
                      type="text"
                      showPassValidation={false}
                      placeholder="Enter Email"
                    />
                  )
                }
              </div>
              <div>
                {
                  (fields.length >= 1)
                    && (
                      <div>
                        <button
                          className="additionalEmails-remove"
                          onClick={() => fields.remove(index)}
                          type="button"
                        />
                      </div>
                    )
                }
              </div>
            </div>
            <div>
              {
                fields.length -1 === index
                  && (
                    <button
                      type="button"
                      className="ProfileGeneral__add-email"
                      onClick={() => fields.push('')}
                    >
                      + Add more
                    </button>
                  )
              }
            </div>
          </div>
        ))
      );
    };
    return (
      <CustomScroll heightRelativeToParent="100%" minScrollHandleHeight={5}>
        <div className="ProfileGeneral">


          <form onSubmit={handleSubmit(this.submit)} className="ProfileGeneral__form">
            <div className="ProfileGeneral__col ProfileGeneral__col--first">
              {
                showCropingPhoto && urlPhoto
                  && (
                    <ProfileImage
                      url={urlPhoto}
                      sendUserPhoto={sendUserPhoto}
                      cancelChangePhoto={this.cancelChangePhoto}
                    />
                  )
              }
              {
                !showCropingPhoto && (
                  <React.Fragment>
                    <div className="ProfileGeneral__photo">
                      <img
                        src={userPhoto || require('../../../img/user-01.svg')}
                        alt=""
                        className={`ProfileGeneral__photo_img ${userPhoto ? '' : ' default'}`}
                      />
                    </div>
                    <label className="ProfileGeneral__change-photo">
                      <input type="file" accept="image/*" onChange={this.onChange} />
                        Change photo
                    </label>
                  </React.Fragment>
                )
              }
            </div>

            <div className="ProfileGeneral__col ProfileGeneral__col--second">
              <Field
                name="given_name"
                component={InputField}
                id="given_name"
                type="text"
                showPassValidation={false}
                placeholder="Enter Given Name"
                label="GIVEN NAME"
                showLabel
                labelStyle="top"
                maxLength="25"
                minLength="2"
              />
              <Field
                name="family_name"
                component={InputField}
                id="family_name"
                type="text"
                showPassValidation={false}
                placeholder="Enter Family Name"
                label="FAMILY NAME"
                showLabel
                labelStyle="top"
                maxLength="60"
                minLength="2"
              />
              <div className="ProfileGeneral__email-list">
                <Field
                  component={InputField}
                  name="email"
                  id="email"
                  type="text"
                  showPassValidation={false}
                  placeholder="Enter Email"
                  label="PRIMARY EMAIL"
                  showLabel
                  labelStyle="top"
                  disabled
                  showMessageforChangeMail
                />
              </div>
              <div className="ProfileGeneral__email-list">
                <FieldArray
                  component={renderEmails}
                  name="additional_emails"
                />
              </div>

              <Field
                name="old_password"
                component={InputField}
                id="old-password"
                type="password"
                showPassValidation
                placeholder="Old password..."
                label="CHANGE PASSWORD"
                showLabel
                labelStyle="top"
                errorMsgForPass={errorMsgForPass}
              />
              <Field
                className="new-password"
                name="new_password"
                component={InputField}
                id="new-password"
                type="password"
                showPassValidation
                placeholder="New password…"
              />
              {
                validatePassword(newPasswordProfile)
                  ? (
                    <div className="auth__PasswordValidation">
                      <NotificationMessageStatic text="Your password is secure and you're all set!" />
                    </div>
                  )
                  : (
                    <div className="auth__PasswordValidation">
                      <PasswordValidationInfo passwordText={newPasswordProfile} />
                    </div>
                  )
              }

            </div>

            <div className="ProfileGeneral__col ProfileGeneral__col--thrid">
              <div className="ProfileGeneral__checkPrivacy">
                <Field
                  className="auth__checkPrivacy_input"
                  name="public"
                  id="public"
                  component={InputCheckbox}
                >
                  <p className="auth__checkPrivacy_text">
                      Public Profile
                    <span>
    Let other ARTiFACTS users know you are open to connecting. You can customize a note about this just above
                    </span>
                  </p>
                </Field>
              </div>

              <Field
                name="description"
                component={TextareaField}
                id="description"
                placeholder="Add Description"
                label={LabelText('DESCRIPTION', '(OPTIONAL)')}
                showLabel
                labelStyle="top"
                maxLength={1000}
              />

              {/* <Field
                  name="research"
                  component={InputField}
                  id="research"
                  type="text"
                  placeholder="Add your research areas to enhance discoverability…  "
                  label={LabelText('RESEARCH AREAS', '(optional)')}
                  showLabel
                  labelStyle="top"
                /> */}

              {/* <div className="ResearchTags">
                  <ul className="ResearchTags__list">
                    <li className="ResearchTags__item">
                      <span className="ResearchTags__text">
                        biology
                      </span>
                      <button
                        className="ResearchTags__delete"
                        type="button"
                      />
                    </li>
                    <li className="ResearchTags__item">
                      <span className="ResearchTags__text">
                        biology
                      </span>
                      <button
                        type="button"
                        className="ResearchTags__delete"
                      />
                    </li>

                  </ul>
                </div> */}

            </div>

            <FixedPanel style={{ width: `calc(100% - ${(sidebarState ? '350px': '100px')})` }}>
              <div className="ProfileGeneral__actions-content">
                <Button
                  className="ProfileGeneral__actions-btn discard"
                  text="Discard"
                  type="button"
                  onClick={() => reset()}
                />
                {/* <Button
                    className="ProfileGeneral__actions-btn preview"
                    text="Preview"
                    type="button"
                    onClick={() => console.log('onClick')}
                  /> */}
                <GradientButton
                  className="ProfileGeneral__actions-btn save"
                  text="Save"
                  type="submit"
                  disabled={profileFormState && profileFormState.values === profileFormState.initial}
                />
              </div>
            </FixedPanel>
          </form>
          <Footer />
        </div>
      </CustomScroll>
    );
  }
}

const validate = (values, props) => {
  const errors = {};
  // name
  if (!values.given_name) {
    errors.given_name = 'Please enter your given name';
  }
  // surname
  if (!values.family_name) {
    errors.family_name = 'Please enter your family name';
  }

  // email
  if (!values.email) {
    errors.email = 'Please enter your email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a proper email address.';
  }

  if (values.additional_emails) {
    const additionalEmailsArrayErrors = [];
    values.additional_emails.forEach((email, index) => {
      const emailErrors = [];
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        emailErrors[index] = 'Please enter a proper email address.';
        additionalEmailsArrayErrors[index] = emailErrors;
      }
    });
    if (additionalEmailsArrayErrors.length) {
      errors.additional_emails = additionalEmailsArrayErrors;
    }
  }

  // password
  if (!values.old_password) {
    props.setErrorMsgForPass(false);
  }
  if (values.old_password === props.oldPasswordProfile) {
    props.setErrorMsgForPass(false);
  }
  if (values.new_password && !englishKeyboardLayout.test(values.new_password)) {
    errors.new_password = 'Please check that you use English keyboard layout and try again';
  } else if (values.new_password && !regPass.test(values.new_password)) {
    errors.new_password = true;
  }
  if (
    (values.new_password === values.old_password)
    && (values.new_password)
    && (values.old_password)
  ) {
    errors.old_password = 'New password can\'t be the same as Old password, please check';
  }
  return errors;
};

ProfileGeneral.defaultProps = {
  newPasswordProfile: '',
  userPhoto: '',
  profileFormState: {},
};

ProfileGeneral.propTypes = {
  userPhoto: PropTypes.string,
  sidebarState: PropTypes.bool.isRequired,
  getProfileData: PropTypes.func.isRequired,
  sendUpdateProfileData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  newPasswordProfile: PropTypes.string,
  errorMsgForPass: PropTypes.bool.isRequired,
  sendUserPhoto: PropTypes.func.isRequired,
  handleShowCropingPhoto: PropTypes.func.isRequired,
  showCropingPhoto: PropTypes.bool.isRequired,
  profileFormState: PropTypes.instanceOf(Object),
};


const ProfileGeneralForm = reduxForm({
  form: 'profile-general',
  validate,
})(ProfileGeneral);

export default withCookies(withRouter(ProfileGeneralForm));
