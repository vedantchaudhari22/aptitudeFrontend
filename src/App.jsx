import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AptitudePlatform from './pages/AptitudePlatform';
import QuestionDetail from './pages/QuestionDetail';
import AdminDashboard from './admin/AdminDashboard';
import AdminUpload from './admin/AdminUpload';
import AdminEdit from './admin/AdminEdit';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import StudentDashboard from './components/StudentDashboard';
import Learn from './pages/Learn';
import AddLecture from './admin/AddLecture';

function App() {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platform" element={<AptitudePlatform />} />
        <Route path="/question/:id" element={<QuestionDetail />} />

        {/* //admin Routes */}
        <Route
          path="/admin"
          element={
           
              <AdminDashboard />
           
          }
        />

        <Route
          path="/admin/add"
          element={
            
              <AdminUpload />
           
          }
        />

        <Route
          path="/admin/edit/:id"
          element={
           
              <AdminEdit />
           
          }
        />

        <Route
          path="/admin/add-lecture"
          element={
        
              <AddLecture />
            
          } />

        {/* //student dashboard route */}
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path='/learn' element={<Learn />} />

      </Routes>
    </Router>
  );
}

export default App;