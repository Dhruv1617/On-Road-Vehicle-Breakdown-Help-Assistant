import { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        { name, email, password }
      );
      localStorage.setItem('token', response.data.token);
      alert('Registration successful!');
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Register error:', err.response?.data || err.message);
      setError(err.response?.data?.msg || 'Failed to register. Please try again.');
    }
  };

  return (
    <div className="page-container register-page">
      <h2 className="page-title">Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
};

export default Register;