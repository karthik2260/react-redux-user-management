import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Admin from './pages/Admin';
import Navbar from './componets/Navbar';
import Profile from './pages/Profile';

function App() {
 
  const authUser = useSelector((Store) => Store.Auth.authUser);

  return (
    <>
      <Navbar/>
      <Routes>
  <Route
    path="/admin" element={authUser && authUser?.role === 'admin' ? <Admin /> : <Navigate to="/login" />}
  />
  <Route
    path="/" element={authUser && authUser?.role !== 'admin' ? <About /> : <Navigate to="/admin" />}
  />
  <Route
    path="/login" element={!authUser ? <Login /> : <Navigate to="/" />}
  />
  <Route
    path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />}
  />
  <Route
    path="/profile" element={authUser ? <Profile /> : <Navigate to="/signup" />}
  />
   <Route path="*" element={<div>Check the route bro!</div>} />
</Routes>

      <Toaster />
    </>
  );
}

export default App;
