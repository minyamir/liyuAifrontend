import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StudyProvider } from './contexts/StudyContext';
import { AuthProvider } from './contexts/AuthContext';

// Import the Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import GradeSelection from './pages/auth/GradeSelection';
import Dashboard from './pages/dashboard/Dashboard';
import StudyRoom from './pages/study/StudyRoom';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <StudyProvider>
          <Routes> 
            <Route path='/' element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
             
            <Route path="/grade-selection" element={<GradeSelection />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/study/:subjectId" element={<StudyRoom />} />
          </Routes>
        </StudyProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;