// FileName: TransactionDetails.js

import React, { useState } from 'react';
import axios from 'axios';
//import './styles.css'; // Ensure you import your CSS file

const TransactionDetails = () => {
  const [schoolId, setSchoolId] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTransactionsBySchool = async () => {
    if (!schoolId) {
      setError('Please enter a school ID.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://school-payment-backend.onrender.com/api/transactions/school/${schoolId}`);
      setTransactions(response.data);
      console.log(response.data);
    } catch (err) {
      setError('Error fetching transactions for this school.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Transaction Details by School</h2>
      <div className="input-container">
        <input
          type="text"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
          placeholder="Enter School ID"
          className="input-field"
        />
        <button onClick={fetchTransactionsBySchool} className="fetch-button">Fetch Transactions</button>
      </div>
      {loading && <p>Loading transactions...</p>}
      {error && <p className="error-message">{error}</p>}
      {transactions.length > 0 && (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Collect ID</th>
              <th>School ID</th>
              <th>Gateway</th>
              <th>Order Amount</th>
              <th>Transaction Amount</th>
              <th>Status</th>
              <th>Custom Order ID</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.collect_id}>
                <td>{transaction.collect_id}</td>
                <td>{transaction.school_id}</td>
                <td>{transaction.gateway}</td>
                <td>{transaction.order_amount}</td>
                <td>{transaction.transaction_amount}</td>
                <td>{transaction.status}</td>
                <td>{transaction.custom_order_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionDetails;