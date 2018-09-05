import React from 'react';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import history from '../store/history';
import LogInPage from '../pages/LogInPage';
import DashboardPage from '../pages/DashboardPage';
import SignUpPage from '../pages/SignUpPage';
import LoginViaOrcidPage from '../pages/LoginViaOrcidPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import NewPassPage from '../pages/NewPassPage';
import HomePage from '../pages/HomePage';
import ArtifactsPage from '../pages/ArtifactsPage';
import NotFoundPage from '../pages/NotFoundPage';
import HealthPage from '../pages/HealthPage';
import authAccess from '../hocs/AuthAccess';
import loggedAccess from '../hocs/LoggedAccess';
import ProfilePage from '../pages/ProfilePage';
import AnalyticsPage from '../pages/AnalyticsPage';
import CommunityPage from '../pages/CommunityPage';
import TransactionsPage from '../pages/TransactionsPage';
import PrivacyPage from '../pages/PrivacyPage';
import TermsAndConditionsPage from '../pages/TermsAndConditionsPage';
import ParticipationAgreementPage from '../pages/ParticipationAgreementPage';


export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={loggedAccess(LogInPage)} />
        <Route path="/dashboard" component={authAccess(DashboardPage)} />
        <Route path="/profile" component={authAccess(ProfilePage)} />
        <Route path="/signup" component={loggedAccess(SignUpPage)} />
        <Route path="/orcid-login" component={loggedAccess(LoginViaOrcidPage)} />
        <Route path="/forgotpass" component={loggedAccess(ForgotPasswordPage)} />
        <Route path="/newpass" component={loggedAccess(NewPassPage)} />
        <Route path="/artifacts" component={authAccess(ArtifactsPage)} />
        <Route path="/analytics" component={authAccess(AnalyticsPage)} />
        <Route path="/community" component={authAccess(CommunityPage)} />
        <Route path="/transactions" component={authAccess(TransactionsPage)} />
        <Route path="/not-found" component={authAccess(NotFoundPage)} />
        <Route path="/health/" component={HealthPage} />
        <Route path="/privacy-policy" component={PrivacyPage} />
        <Route path="/terms-and-conditions" component={TermsAndConditionsPage} />
        <Route path="/participation-agreement" component={ParticipationAgreementPage} />
        <Redirect from="*" to="/not-found" />
      </Switch>
    </Router>
  );
}
