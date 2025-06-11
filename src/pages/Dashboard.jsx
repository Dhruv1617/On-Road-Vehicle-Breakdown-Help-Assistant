import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RequestForm from '../components/RequestForm';
import MechanicList from '../components/MechanicList';

const Dashboard = () => {
  const [mechanics, setMechanics] = useState([]);
  const navigate = useNavigate();

  const fetchMechanics = async (location) => {
    try {
      console.log('Fetching mechanics for location:', location); // Debug log
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/request/mechanics?location=${location}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      console.log('Mechanics fetched:', data); // Debug log
      setMechanics(data);
    } catch (err) {
      console.error('Fetch mechanics error:', err.response?.data || err.message);
      alert(err.response?.data?.msg || 'Failed to fetch mechanics');
      setMechanics([]); // Clear mechanics list on error
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, redirecting to login'); // Debug log
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <RequestForm onSubmit={fetchMechanics} />
      <MechanicList mechanics={mechanics} />
    </div>
  );
};

export default Dashboard;