import { Link } from 'react-router-dom';
import '../App.css';

const Landing = () => {
  return (
    <div className="page-container landing-page">
      <div className="hero">
        <h1>Welcome to Roadside Assistance</h1>
        <p>Find nearby mechanics quickly during vehicle breakdowns.</p>
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn">Register</Link>
      </div>
    </div>
  );
};

export default Landing;