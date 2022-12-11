import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Documents from './pages/Documents';
import Boxes from './pages/Boxes';
import Tags from './pages/Tags';
import Profile from './pages/Profile';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import MainLayout from './layouts/Main';
import AxiosInterceptorsSetup from './AxiosInterceptorsSetup';
import instance from './axiosConfig';
import './App.css';

function App() {
  function AxiosInterceptorNavigate() {
    let navigate = useNavigate();
    AxiosInterceptorsSetup(navigate, instance);
    return <></>;
  }

  return (
    <>
      <Router>
        {<AxiosInterceptorNavigate />}
        <Routes>
          <Route path="/" element={<MainLayout />} >
            <Route path="/" element={<Documents />} />
            <Route path="/boxes" element={<Boxes />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
