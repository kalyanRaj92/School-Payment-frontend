// FileName: TransactionStatusCheck.js

import React, { useState } from 'react';
import axios from 'axios';
//import './styles.css'; // Ensure you import your CSS file

const TransactionStatusCheck = () => {
  const [customOrderId, setCustomOrderId] = useState('');
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkStatus = async () => {
    if (!customOrderId) {
      setError('Please enter a custom order ID.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://school-payment-backend.onrender.com/api/transactions/status/${customOrderId}`);
      setTransaction(response.data);
      console.log(response.data);
    } catch (err) {
      setError('Error fetching transaction status.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Transaction Status Check</h2>
      <div className="input-container">
        <input
          type="text"
          value={customOrderId}
          onChange={(e) => setCustomOrderId(e.target.value)}
          placeholder="Enter Custom Order ID"
          className="input-field"
        />
        <button onClick={checkStatus} className="fetch-button">Check Status</button>
      </div>
      {loading && <p>Loading transaction status...</p>}
      {error && <p className="error-message">{error}</p>}
      {transaction && (
        <div className="transaction-details">
          <h3>Transaction Details</h3>
          <p><strong>Collect ID:</strong> {transaction.collect_id}</p>
          <p><strong>School ID:</strong> {transaction.school_id}</p>
          <p><strong>Gateway:</strong> {transaction.gateway}</p>
          <p><strong>Order Amount:</strong> {transaction.order_amount}</p>
          <p><strong>Transaction Amount:</strong> {transaction.transaction_amount}</p>
          <p><strong>Status:</strong> {transaction.status}</p>
          <p><strong>Custom Order ID:</strong> {transaction.custom_order_id}</p>
        </div>
      )}
    </div>
  );
};

export default TransactionStatusCheck;