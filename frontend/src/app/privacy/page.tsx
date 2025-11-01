import './privacy.css';

export default function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <div className="privacy-hero">
        <div className="privacy-hero-content">
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-subtitle">Last updated: November 2025</p>
        </div>
      </div>

      <div className="privacy-content">
        <div className="privacy-section">
          <h2 className="privacy-section-title">1. Introduction</h2>
          <p className="privacy-section-text">
            Welcome to BookIt. We are committed to protecting your privacy and ensuring 
            the security of your personal information. This Privacy Policy explains how 
            we collect, use, disclose, and safeguard your information when you use our 
            services.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-section-title">2. Information We Collect</h2>
          <div className="privacy-subsection">
            <h3 className="privacy-subsection-title">Personal Information</h3>
            <ul className="privacy-list">
              <li>Name and contact details</li>
              <li>Email address and phone number</li>
              <li>Payment information</li>
              <li>Booking preferences and history</li>
              <li>Identification documents (when required)</li>
            </ul>
          </div>
          <div className="privacy-subsection">
            <h3 className="privacy-subsection-title">Technical Information</h3>
            <ul className="privacy-list">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Usage data and analytics</li>
              <li>Cookies and tracking technologies</li>
            </ul>
          </div>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-section-title">3. How We Use Your Information</h2>
          <ul className="privacy-list">
            <li>To provide and maintain our services</li>
            <li>To process your bookings and payments</li>
            <li>To communicate with you about your experiences</li>
            <li>To improve our services and user experience</li>
            <li>To send promotional communications (with your consent)</li>
            <li>To ensure security and prevent fraud</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-section-title">4. Information Sharing</h2>
          <p className="privacy-section-text">
            We may share your information with:
          </p>
          <ul className="privacy-list">
            <li>Experience hosts to facilitate your bookings</li>
            <li>Payment processors to complete transactions</li>
            <li>Service providers who assist our operations</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners with your explicit consent</li>
          </ul>
          <p className="privacy-section-text">
            We never sell your personal information to third parties.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-section-title">5. Data Security</h2>
          <p className="privacy-section-text">
            We implement appropriate technical and organizational security measures 
            to protect your personal information against unauthorized access, 
            alteration, disclosure, or destruction. These measures include:
          </p>
          <ul className="privacy-list">
            <li>Encryption of sensitive data</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication</li>
            <li>Secure data storage practices</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-section-title">6. Your Rights</h2>
          <p className="privacy-section-text">
            You have the right to:
          </p>
          <ul className="privacy-list">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="privacy-section-text">
            To exercise these rights, please contact us at privacy@bookit.com.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-section-title">7. Cookies and Tracking</h2>
          <p className="privacy-section-text">
            We use cookies and similar tracking technologies to:
          </p>
          <ul className="privacy-list">
            <li>Remember your preferences</li>
            <li>Analyze website traffic</li>
            <li>Personalize your experience</li>
            <li>Enable certain functionalities</li>
          </ul>
          <p className="privacy-section-text">
            You can control cookie settings through your browser preferences.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-section-title">8. International Transfers</h2>
          <p className="privacy-section-text">
            Your information may be transferred to and processed in countries 
            outside of your residence. We ensure appropriate safeguards are in 
            place to protect your data in accordance with this Privacy Policy.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-section-title">9. Data Retention</h2>
          <p className="privacy-section-text">
            We retain your personal information only for as long as necessary 
            to fulfill the purposes outlined in this policy, unless a longer 
            retention period is required or permitted by law.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-section-title">10. Children's Privacy</h2>
          <p className="privacy-section-text">
            Our services are not intended for individuals under the age of 16. 
            We do not knowingly collect personal information from children. If 
            you believe we have collected information from a child, please 
            contact us immediately.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-section-title">11. Changes to This Policy</h2>
          <p className="privacy-section-text">
            We may update this Privacy Policy from time to time. We will notify 
            you of any changes by posting the new policy on this page and updating 
            the "Last updated" date.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-section-title">12. Contact Us</h2>
          <p className="privacy-section-text">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="privacy-contact-info">
            <p>Email: shuklamanya99@gmail.com</p>
            <p>Phone: 800-55-86-588</p>
            <p>Address: Damodar Hostel, JNU NEW DELHI</p>
          </div>
        </div>
      </div>
    </div>
  );
}