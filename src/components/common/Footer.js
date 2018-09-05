import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Footer = () => (
  <p className="Footer">
    Copyright &copy; 2017—2018 ARTiFACTS.
    <HashLink to="/privacy-policy#cookies-usage" target="_blank">
      Cookie Preferences
    </HashLink>
    ,
    <Link to="/privacy-policy" target="_blank">
      Privacy
    </Link>
    {' '}
    and
    <Link to="/terms-and-conditions" target="_blank">
      Terms
    </Link>
  </p>
);


export default Footer;
