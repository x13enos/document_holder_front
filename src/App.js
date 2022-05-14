import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
// import MainLayout from './layouts/Main';
// import Accounts from './pages/Accounts';
// import Expenses from './pages/Expenses';
// import BankAccounts from './pages/BankAccounts';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<MainLayout />} >
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/bank_accounts" element={<BankAccounts />} />
          </Route> */}
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
