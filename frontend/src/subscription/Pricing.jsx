import "./Pricing.css";
import Navbar from "../pages/Navbar";
const Pricing = () => {
  return (
    <>
      <Navbar />

      <div className="pricing-page">
        
        <h1 className="pricing-title">Pricing</h1>

        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Free</h3>
            <h2>₹0 / FREE</h2>

            <button className="btn disabled">Current Plan</button>

            <ul>
              <li>Add only 3 projects</li>
              <li>Basic Task Management</li>
              <li>Project Collaboration</li>
              <li>Basic Reporting</li>
              <li>Email Notifications</li>
              <li>Basic Access Control</li>
            </ul>
          </div>

          <div className="pricing-card highlight">
            <h3>Monthly Paid Plan</h3>
            <h2>₹799 / MONTHLY</h2>

            <button className="btn primary">Get Started</button>

            <ul>
              <li>Add unlimited project</li>
              <li>Access to live chat</li>
              <li>Add unlimited team member</li>
              <li>Advanced Reporting</li>
              <li>Priority Support</li>
              <li>Customization Options</li>
              <li>Integration Support</li>
              <li>Advanced Security</li>
              <li>Training and Resources</li>
              <li>Access Control</li>
              <li>Custom Workflows</li>
            </ul>
          </div>

          <div className="pricing-card">
            <h3>Annual Paid Plan</h3>
            <h2>₹6711 / ANNUALLY</h2>
            <span className="discount">30% off</span>

            <button className="btn primary">Get Started</button>

            <ul>
              <li>Add unlimited project</li>
              <li>Access to live chat</li>
              <li>Add unlimited team member</li>
              <li>Advanced Reporting</li>
              <li>Priority Support</li>
              <li>Everything which monthly plan has</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
