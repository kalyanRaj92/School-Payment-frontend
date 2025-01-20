import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TransactionDetails from './components/TransactionDetails';
import TransactionStatusCheck from './components/TransactionStatusCheck';

const App = () => {
  return (
      <Router>
        <div className="container">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/transactions/school" element={<TransactionDetails/>} />
            <Route path="/transactions/status" element={<TransactionStatusCheck/>} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;