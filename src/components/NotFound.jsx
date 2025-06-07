import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="error-actions">
          <Link to="/news" className="btn btn-primary">
            Go to News Feed
          </Link>
          <Link to="/" className="btn btn-secondary">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
