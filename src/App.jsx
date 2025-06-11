import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './components/Login';
import Register from './components/Register';
import RequestForm from './components/RequestForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<RequestForm onSubmit={(location) => console.log('Submitted:', location)} />} />
      </Routes>
    </Router>
  );
};

export default App;