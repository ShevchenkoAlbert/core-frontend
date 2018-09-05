import React from 'react';
import Helmet from 'react-helmet';
import AuthLoyaut from '../components/auth/AuthLoyaut';
import { config } from '../env';

const TermsAndConditionsPage = () => (
  <div className="logIn-page-wrapper">
    <Helmet>
      <title>
      ARTIFACTS | Terms and Conditions
      </title>
    </Helmet>
    <AuthLoyaut>
      <div className="container">
        <div className="agreement_and_policy_wrapper">
          <h1 className="terms-title">
TERMS OF USE
          </h1>
          <ol className="numbered">
            <li>
              <p>
                <strong>
Background.
                  {' '}
                </strong>
Artifactsofresearch, Inc. (“ARTiFACTS”) is an academic and research platform utilizing distributed ledger technology that enables Registered Users (as defined below) to upload or provide a link to a central repository for academic and research artifacts. Registered Users can establish proof-of-existence for their artifacts, and manage, track and link their artifacts and profiles by engaging in immutable ‘transactions’ on a secure blockchain. Such immutable transactions may include, for example, establishing proof of existence for a digital file, and providing and receiving attribution. By using the Service (as defined below), but not registering to become a Registered User, you will be permitted solely a limited right to use industry standard search methods to find relevant artifacts and explore linkages between them.
              </p>
            </li>
            <li>
              <p>
                <strong>
Agreement.
                  {' '}
                </strong>
The following agreement (this “Agreement”) is between you, as an End User, and ARTiFACTS, and sets forth the terms and conditions for your use of the ARTiFACTS platform (the “Service”), which will allow you solely to search and view information published on the Service. By using the Service, you accept and shall be legally bound by all of the terms and conditions of this Agreement.
              </p>
            </li>
            <li>
              <p>
                <strong>
Definitions
                  {' '}
                </strong>
As used in this Agreement, the following terms shall have the meanings set forth below:
              </p>
              <p>
                <strong>
“End User”
                  {' '}
                </strong>
means an individual who has established a user profile on the Service enabling such individual to search and view Items in accordance with and subject to the terms of this Agreement and the Privacy Policy. For purposes of clarity, as an End User, you will not have the ability to engage in any Transaction unless such End User becomes a Registered User.
              </p>
              <p>
                <strong>
“Item”
                  {' '}
                </strong>
means a discrete research or academic artifact uploaded to or transacted on the Service by a Registered User. For purposes of clarity, a research paper and the raw data associated therewith are separate and distinct Items, as are cites to other Items within such research paper, and to such research paper itself.
              </p>
              <p>
                <strong>
“Privacy Policy”
                  {' '}
                </strong>
means the privacy policy for the Service, located at
                {' '}
                <a href={`${config.BASE_URL}privacy-policy/`}>
                  {`${config.BASE_URL}privacy-policy/`}
                </a>
              </p>
              <p>
                <strong>
“Registered User”
                  {' '}
                </strong>
means an End User who has successfully submitted a Registered User application to and established a Registered User profile on the Service. For purposes of clarity, a Registered User has the ability to engage in Transactions in addition to the access to Items afforded to End Users.
                {' '}
              </p>
              <p>
                <strong>
“Transaction”
                  {' '}
                </strong>
means the interaction with an Item where such activity will be part of the Service’s blockchain (i.e. the distributed ledger accessed within the Service). By way of example, but not of limitation, a Transaction may include the uploading of an Item and establishing proof of existence for that Item as well as receiving or providing an attribution related to that Item.
              </p>
              <p>
                <strong>
“Work”
                  {' '}
                </strong>
means all Items uploaded or transacted on the Service by you, including without limitation, articles and abstracts thereof, data, charts, graphs, images and the like.
              </p>
            </li>
            <li>
              <p>
                <strong>
Use of Service.
                  {' '}
                </strong>
You may search and view Work on the Service.  No license is granted hereby from ARTiFACTS to you to make any other use of the Service, unless you become a Registered User.
              </p>
            </li>
            <li>
              <p>
                <strong>
Disclaimer.
                  {' '}
                </strong>
ARTiFACTS takes no responsibility and assumes no liability for any data or information uploaded, published, posted, stored or transmitted on or through the Service, or for any loss or damage thereto, nor is ARTiFACTS liable for any mistakes, defamation, slander, libel, omissions, falsehoods, obscenity, pornography or profanity you may encounter. As a provider of interactive services, ARTiFACTS is not liable for any statements, representations, data or information provided by any End User in, on or through the Service.
              </p>
            </li>
            <li>
              <p>
                <strong>
Prohibited Conduct.
                  {' '}
                </strong>
You shall not take any of the following actions nor engage in any of the following conduct in connection with your use of the Service:
                {' '}
              </p>
              <ul>
                <li>
                  <p>
Impersonate another person, or his or her email address or create a Registered User profile under false or fraudulent pretenses;
                  </p>
                </li>
                <li>
                  <p>
Misrepresent your identity or affiliation with any person or organization or create the impression that any Item emanates from or is endorsed by ARTiFACTS or, if untrue, by any other person or entity.
                  </p>
                </li>
                <li>
                  <p>
Promote, endorse or further illegal or fraudulent activity;
                    {' '}
                  </p>
                </li>
                <li>
                  <p>
Disclose any data or information in violation of any legally enforceable confidentiality, non-disclosure or other contractual restriction or right of any third party;
                    {' '}
                  </p>
                </li>
                <li>
                  <p>
Violate the privacy, publicity, copyright, patent, trademark, trade secret, or other intellectual property or proprietary rights of any third-party;
                    {' '}
                  </p>
                </li>
                <li>
                  <p>
Engage in the exploitation of a person in a sexual or violent manner;
                    {' '}
                  </p>
                </li>
                <li>
                  <p>
Solicit personally identifying information from a minor;
                    {' '}
                  </p>
                </li>
                <li>
                  <p>
Imply an endorsement by or partnership of any kind with ARTiFACTS without our express written permission;
                    {' '}
                  </p>
                </li>
                <li>
                  <p>
Use the Service for any commercial activity and/or promotion such as contests, sweepstakes, barter, pyramid schemes, advertising, affiliate links, and other forms of solicitation, or to send messages in violation of the USA CAN-SPAM Act or any other applicable anti-spam law; or sell, resell, rent, lease, loan, trade or otherwise monetize access to the Service or any content contained therein;
                  </p>
                </li>
                <li>
                  <p>
Attempt to modify, translate, adapt, edit, decompile, disassemble, or reverse engineer any software programs used by ARTiFACTS in connection with the Service.
                  </p>
                </li>
                <li>
                  <p>
Take any action that imposes, or may impose, in ARTiFACTS’ discretion, an unreasonable or disproportionately large load on the Service infrastructure, or introduce into the Service any viruses, Trojan horses, worms, time bombs, cancelbots, malware, corrupted data or other harmful, disruptive or destructive files.
                  </p>
                </li>
                <li>
                  <p>
Attempt to circumvent any security feature of the Service;
                    {' '}
                  </p>
                </li>
                <li>
                  <p>
Introduce software or automated agents to the Service, or access the Service so as to produce multiple accounts, generate automated messages, or to scrape, strip or mine data from the System without our express written permission; or
                  </p>
                </li>
                <li>
                  <p>
“Frame” or “mirror” or otherwise incorporate part of the Service into any website, or “deep-link” to any portion of the Service without our express written permission.
                    {' '}
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <p>
                <strong>
Obligations of the Service.
                  {' '}
                </strong>
The Service shall not use any Item for any purpose other than as specifically permitted by this Agreement. Without limiting the foregoing, the Service shall not use any Item for any commercial purpose, including without limitation, bulk reproduction or distribution of Work in any form.
                {' '}
              </p>
            </li>
            <li>
              <p>
                <strong>
LIABILITY DISCLAIMER.
                </strong>
              </p>
              <ul>
                <li>
                  <p>
THE SOFTWARE, DATA, INFORMATION AND ITEMS CONTAINED IN OR PUBLISHED ON OR BY THE SERVICE MAY INCLUDE INACCURACIES OR ERRORS. ARTiFACTS DOES NOT GUARANTEE THE ACCURACY OF, AND DISCLAIMS ALL LIABILITY FOR, ANY ERRORS OR OTHER INACCURACIES RELATING TO ANY AND ALL SUCH SOFTWARE, DATA, INFORMATION AND ITEMS.
                    {' '}
                  </p>
                </li>
                <li>
                  <p>
ARTiFACTS MAKES NO REPRESENTATIONS ABOUT THE SUITABILITY OF THE SOFTWARE, DATA, INFORMATION OR ANY ITEM CONTAINED IN THE SERVICE FOR ANY PURPOSE, AND THE INCLUSION OF ANY ITEM IN THE SERVICE DOES NOT CONSTITUTE ANY ENDORSEMENT OR RECOMMENDATION THEREOF BY ARTiFACTS. ALL SUCH DATA, INFORMATION, SOFTWARE AND ITEMS ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND. ARTiFACTS DISCLAIMS ALL WARRANTIES AND CONDITIONS THAT THE SERVICE, ITS SERVERS OR ANY NOTIFICATION OR COMMUNICATION SENT BY OR THROUGH THE SERVICE OR BY ARTiFACTS, ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. ARTiFACTS HEREBY DISCLAIMS ALL WARRANTIES AND CONDITIONS WITH REGARD TO SUCH SOFTWARE, DATA, INFORMATION AND ITEMS, INCLUDING ALL IMPLIED WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NONINFRINGEMENT.
                  </p>
                </li>
                <li>
                  <p>
ALL END USERS ARE RESPONSIBLE FOR THEIR OWN ACTIONS AND WORK, AND ARTiFACTS IS NOT LIABLE FOR THE ACTS, ERRORS, OMISSIONS, REPRESENTATIONS, WARRANTIES, BREACHES OR NEGLIGENCE OF ANY END USER OR FOR ANY PERSONAL INJURIES, DEATH, PROPERTY DAMAGE, OR OTHER DAMAGES OR EXPENSES RESULTING FROM ANY DATA OR INFORMATION CONTAINED IN THE SERVICE.
                    {' '}
                  </p>
                </li>
                <li>
                  <p>
IN NO EVENT SHALL ARTiFACTS (OR ITS AFFILIATES, OR ITS OR THEIR RESPECTIVE OFFICERS, DIRECTORS, PARTNERS, MEMBERS OR SHAREHOLDERS) BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF, OR IN ANY WAY CONNECTED WITH, YOUR ACCESS TO, DISPLAY OF OR USE OF THE SERVICE OR WITH THE DELAY OR INABILITY TO ACCESS, DISPLAY OR USE THE SERVICE (INCLUDING, BUT NOT LIMITED TO, YOUR RELIANCE UPON ANY INFORMATION OR DATA CONTAINED IN ANY ITEM, ANY COMPUTER VIRUS OR OTHER MALICIOUS CODE, AND ANY INFORMATION OR DATA OTHERWISE ARISING OUT OF THE ACCESS TO, DISPLAY OF OR USE OF THE SERVICE), WHETHER BASED ON A THEORY OF NEGLIGENCE, CONTRACT, TORT, STRICT LIABILITY, OR OTHERWISE, AND EVEN IF ARTiFACTS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                  </p>
                </li>
                <li>
                  <p>
If ARTiFACTS is found liable for any loss or damage that arises out of or is in any way connected with your use of the Service, then ARTiFACTS’ liabilities will in no event exceed, in the aggregate, One-Hundred Dollars (US $100.00).
                  </p>
                </li>
                <li>
                  <p>
The limitation of liability reflects the allocation of risk between the parties. The limitations specified in this section will survive and apply even if any limited remedy specified in these terms is found to have failed of its essential purpose. The limitations of liability provided in these terms inure to the benefit of ARTiFACTS and its affiliates.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <p>
                <strong>
Indemnification.
                  {' '}
                </strong>
You shall indemnify and hold ARTiFACTS, its affiliates, successors and assigns, and their respective officers, directors, shareholders, members, partners and employees harmless from and against any and all losses, claims, damages, liabilities, costs and expenses, including reasonable attorney’s fees, brought by a third party and arising from or as a result of (i) your breach of this Agreement; (ii) your violation of any applicable law, rule or regulation in your use of the Service; or (iii) your use of the Service.
              </p>
            </li>
            <li>
              <p>
                <strong>
General.
                </strong>
              </p>
              <ul>
                <li>
                  <p>
ARTiFACTS may modify the terms of this Agreement from time to time at its sole discretion, and therefore you should periodically review this Agreement for changes. If you continue using the Service after such changes, you shall be deemed to have accepted such changes to the terms of this Agreement.
                  </p>
                </li>
                <li>
                  <p>
No joint venture, agency, partnership, or employment relationship exists between the parties as a result of this Agreement or use of the Service. Performance by ARTiFACTS under this Agreement is subject to existing laws and legal process, and nothing contained in this Agreement limits the right of ARTiFACTS to comply with law enforcement or other governmental or legal requests or requirements relating to use of the Service by any End User or any data or information provided to or gathered by ARTiFACTS with respect to such use.
                  </p>
                </li>
                <li>
                  <p>
This Agreement will be governed by, and construed in accordance with, the internal laws of the Commonwealth of Massachusetts, without regard to its choice of laws principles.  You hereby irrevocably consent to the exclusive jurisdiction of, and venue in, any federal or state court of competent jurisdiction located in the Commonwealth of Massachusetts for the purposes of adjudicating any matter arising from or in connection with this Agreement.
                  </p>
                </li>
                <li>
                  <p>
This Agreement, together with the Privacy Policy, constitutes the entire agreement between you and ARTiFACTS concerning the Service, and supersedes any and all prior or contemporaneous communications and proposals, whether electronic, oral, or written, between the you and ARTiFACTS with respect to the Service. A printed version of this Agreement and of any notice given hereunder in electronic form shall be admissible in judicial or administrative proceedings based upon or relating to this Agreement to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form.
                  </p>
                </li>
                <li>
                  <p>
The failure of ARTiFACTS to exercise or enforce any right or provision of this Agreement shall not operate as a waiver of such right or provision. The section titles in this Agreement are for convenience only and have no legal or contractual effect. This Agreement operates to the fullest extent permissible by law. If any provision of this Agreement is unlawful, void or unenforceable, including, but not limited to, the warranty disclaimers and liability limitations set forth above, then the invalid or unenforceable provision will be deemed superseded by a valid, enforceable provision that most closely matches the intent of the original provision and the remaining provisions in this Agreement shall continue in effect.  Any rights not expressly granted herein are reserved.
                  </p>
                </li>
                <li>
                  <p>
This Agreement is not assignable or transferable by you, by operating of law or otherwise, without the prior written consent of ARTiFACTS. Any purported assignment or transfer in violation of the foregoing shall be void. This Agreement shall be binding on the parties’ respective successors and permitted assigns.
                  </p>
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </AuthLoyaut>
  </div>
);

export default TermsAndConditionsPage;
