import React from 'react';
import Footer from '../common/Footer';

const CoomingSoonSvg = require('-!svg-react-loader!../../img/coming-soon.svg');

const ComingSoon = props => (
  <section className="ComingSoon">
    <CoomingSoonSvg />
    <h4>
      COMING SOON
    </h4>
    <h4 className="coming-text">
      We are hard at work adding new features to ARTiFACTS.ai to help with your collaborative projects and your research reputation. Shortly you will be able to easily import data into your profile and dashboard from a range of Web sources. Stay tuned!
    </h4>
    <Footer />
  </section>
);


export default ComingSoon;
