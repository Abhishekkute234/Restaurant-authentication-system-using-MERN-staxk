import React from "react";
import "./Footer.css"; // Assuming you have a CSS file for styles

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-info">
        <div className="footer-section">
          <img src="/frontend/src/assets/truck.png" alt="Free delivery" />
          <h4>Free delivery (Above ₹1,000)</h4>
          <p>Delivery happens within: 2-5 days</p>
        </div>
        <div className="footer-section">
          <img src="/frontend/src/assets/paisa.png" alt="Payment options" />
          <h4>Payment options</h4>
          <p>Cash on delivery and online payment</p>
        </div>
        <div className="footer-section">
          <img src="/frontend/src/assets/question.png" alt="Customer support" />
          <h4>Customer support</h4>
          <p>support@standardstore.in</p>
        </div>
      </div>

      <div className="store-details" style={{ textAlign: "center" }}>
        <h3>Store Details</h3>
        <p>Standard Store</p>
        <p>
          New No.104, Old, 42, Valmiki St, Thiruvanmiyur, Chennai, Tamil Nadu
          600041
        </p>
        <p>Mobile: 9677227688 & 9677063560</p>
        <div className="flex justify-center">
          {/* Google Maps Embed */}
          <iframe
            title="Store Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3754.019006366746!2d76.55263037574604!3d20.704624601313224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd26f876d9c545f%3A0x4ed379440e9eb602!2sJoshi%20Nagar%2C%20Khamgaon%2C%20Maharashtra%20444303!5e0!3m2!1sen!2sin!4v1695815036196!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="footer-social">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pinterest
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
