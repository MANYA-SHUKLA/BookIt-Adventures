import Link from 'next/link';
import './help.css';

export default function HelpCenter() {
  return (
    <div className="help-container">
      <div className="help-hero">
        <div className="help-hero-content">
          <h1 className="help-title">Help Center</h1>
          <p className="help-subtitle">Find answers to your questions and get the support you need</p>
        </div>
      </div>

      <div className="help-content">
        <div className="help-categories">
          <div className="help-category">
            <div className="help-category-icon">🎫</div>
            <h3 className="help-category-title">Booking & Reservations</h3>
            <p className="help-category-description">
              Questions about making, modifying, or canceling bookings
            </p>
            <ul className="help-category-links">
              <li>How to book an experience</li>
              <li>Modifying your booking</li>
              <li>Cancellation policy</li>
              <li>Payment issues</li>
            </ul>
          </div>

          <div className="help-category">
            <div className="help-category-icon">❓</div>
            <h3 className="help-category-title">Account & Profile</h3>
            <p className="help-category-description">
              Manage your account, profile settings, and personal information
            </p>
            <ul className="help-category-links">
              <li>Creating an account</li>
              <li>Resetting your password</li>
              <li>Updating profile information</li>
              <li>Deleting your account</li>
            </ul>
          </div>

          <div className="help-category">
            <div className="help-category-icon">💰</div>
            <h3 className="help-category-title">Payments & Refunds</h3>
            <p className="help-category-description">
              Information about payments, billing, and refund requests
            </p>
            <ul className="help-category-links">
              <li>Accepted payment methods</li>
              <li>Refund process</li>
              <li>Billing issues</li>
              <li>Using promo codes</li>
            </ul>
          </div>

          <div className="help-category">
            <div className="help-category-icon">🌍</div>
            <h3 className="help-category-title">Experiences & Hosts</h3>
            <p className="help-category-description">
              Learn about our experiences and host guidelines
            </p>
            <ul className="help-category-links">
              <li>What to expect</li>
              <li>Experience requirements</li>
              <li>Communicating with hosts</li>
              <li>Reporting an issue</li>
            </ul>
          </div>

          <div className="help-category">
            <div className="help-category-icon">🔒</div>
            <h3 className="help-category-title">Safety & Security</h3>
            <p className="help-category-description">
              Important information about safety and security measures
            </p>
            <ul className="help-category-links">
              <li>Safety guidelines</li>
              <li>Emergency procedures</li>
              <li>Data privacy</li>
              <li>Trust and verification</li>
            </ul>
          </div>

          <div className="help-category">
            <div className="help-category-icon">📱</div>
            <h3 className="help-category-title">Technical Support</h3>
            <p className="help-category-description">
              Get help with technical issues and app problems
            </p>
            <ul className="help-category-links">
              <li>App not working</li>
              <li>Browser compatibility</li>
              <li>Notification issues</li>
              <li>Contact technical support</li>
            </ul>
          </div>
        </div>

        <div className="help-contact">
          <div className="help-contact-card">
            <h3 className="help-contact-title">Still need help?</h3>
            <p className="help-contact-description">
              Our support team is here to assist you with any questions or concerns.
            </p>
            <div className="help-contact-methods">
              <div className="help-contact-method">
                <div className="help-contact-icon">📧</div>
                <div className="help-contact-info">
                  <h4>Email Support</h4>
                  <p>shuklamanya99@gmail.com</p>
                  <span>Typically responds within 24 hours</span>
                </div>
              </div>
              <div className="help-contact-method">
                <div className="help-contact-icon">💬</div>
                <div className="help-contact-info">
                  <h4>Live Chat</h4>
                  <p>Available 9AM-6PM IST</p>
                  <span>Get instant help from our team</span>
                </div>
              </div>
              <div className="help-contact-method">
                <div className="help-contact-icon">📞</div>
                <div className="help-contact-info">
                  <h4>Phone Support</h4>
                  <p>800-55-86-588</p>
                  <span>Mon-Fri, 8AM-8PM EST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}