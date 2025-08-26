import './Subscription.css';

const Subscription = () => {
  return (
    <div className="subscription-wrapper">
      <div className="subscription-container">
        <button
          className="subscription-back-button"
          onClick={() => window.history.back()}
          type="button"
          aria-label="Go back"
        >
          ← Back
        </button>
        <h1 className="subscription-title">Subscription Plans</h1>
        <p className="subscription-description">
          Choose a plan that fits your needs and unlock premium features.
        </p>
        <ul className="subscription-list">
          <li className="subscription-item">Basic Plan - Free</li>
          <li className="subscription-item">Premium Plan - $9.99/month</li>
          <li className="subscription-item">Pro Plan - $19.99/month</li>
        </ul>
        <button
          className="subscribe-button"
          type="button"
          onClick={() => alert('Subscription feature coming soon!')}
        >
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default Subscription;
