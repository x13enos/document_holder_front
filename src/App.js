import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Documents from './pages/Documents';
import Boxes from './pages/Boxes';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import MainLayout from './layouts/Main';
// import Accounts from './pages/Accounts';
// import Expenses from './pages/Expenses';
// import BankAccounts from './pages/BankAccounts';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />} >
            <Route path="/" element={<Documents />} />
            <Route path="/boxes" element={<Boxes />} />
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
