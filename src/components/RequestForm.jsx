import { useState } from 'react';
import axios from 'axios';
import '../App.css';

const RequestForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [problem, setProblem] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [mechanics, setMechanics] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const locationRegex = /^-?\d+\.\d{4,}\s*,\s*-?\d+\.\d{4,}$/;
    if (!locationRegex.test(location)) {
      setError('Please enter location as latitude,longitude (e.g., 28.5708,77.3260)');
      return;
    }
    setError('');
    setMechanics([]);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in again.');
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/request`,
        { name, phone, problem, location },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      alert('Request submitted successfully!');
      const mechanicsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/request/mechanics?location=${location}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMechanics(mechanicsResponse.data);
      if (mechanicsResponse.data.length === 0) {
        alert('No mechanics found near this location.');
      } else if (!mechanicsResponse.data.some((mechanic) => mechanic.phone !== 'N/A')) {
        alert('Mechanics found, but no phone numbers are available.');
      }
      onSubmit(location);
      setName('');
      setPhone('');
      setProblem('');
      setLocation('');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Failed to submit request.';
      setError(errorMsg);
      alert(errorMsg);
    }
  };

  return (
    <div className="page-container dashboard-page">
      <h2 className="page-title">Request Breakdown Assistance</h2>
      <form onSubmit={handleSubmit} className="form card">
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="problem">Problem Description</label>
          <textarea
            id="problem"
            placeholder="Describe the vehicle issue"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location (Latitude,Longitude)</label>
          <input
            id="location"
            type="text"
            placeholder="e.g., 28.5708,77.3260"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn">Submit Request</button>
      </form>
      {mechanics.length > 0 && (
        <div className="mechanic-list">
          <h3 className="page-title">Nearby Mechanics</h3>
          {mechanics.map((mechanic, index) => (
            <div key={index} className="mechanic-card card">
              <p className="mechanic-name">{mechanic.name}</p>
              <p className="mechanic-address">{mechanic.address}</p>
              {mechanic.phone !== 'N/A' && (
                <p className="mechanic-phone">Phone: {mechanic.phone}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestForm;