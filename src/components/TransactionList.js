import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // Display 10 rows per page

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("https://school-payment-backend.onrender.com/api/transactions");
        console.log(response.data);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    return (statusFilter ? transaction.status.toLowerCase() === statusFilter.toLowerCase() : true) &&
           (dateRange.start && dateRange.end ? 
            new Date(transaction.date) >= new Date(dateRange.start) && 
            new Date(transaction.date) <= new Date(dateRange.end) : true);
  });

  // Calculate the current rows to display
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredTransactions.slice(indexOfFirstRow, indexOfLastRow);

  // Handle page change
  /*const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };*/

  // Handle previous and next page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredTransactions.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Create pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredTransactions.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) return <p>Loading transactions...</p>;

  // Function to shorten IDs
  const shortenId = (id) => {
    return id.substring(20,28); // Shorten to first 8 characters
  };

  // Function to get status class
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'status-success';
      case 'pending':
        return 'status-pending';
      case 'failure':
        return 'status-failure';
      default:
        return '';
    }
  };


   // Function to get status class for row background
   const getRowClass = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'row-success';
      case 'pending':
        return 'row-pending';
      case 'failure':
        return 'row-failure';
      default:
        return '';
    }
  };

  return (
    <div>
      <div className="filter-container">
        <select onChange={(e) => setStatusFilter(e.target.value)} defaultValue="">
          <option value="">All Statuses</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
          <option value="Failure">Failure</option>
        </select>
        <input type="date" onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} />
        <input type="date" onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} />
      </div>
      <table>
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
          {currentRows.map(transaction => (
            <tr key={transaction.collect_id} className={getRowClass(transaction.status)}>
              <td>{shortenId(transaction.collect_id)}</td>
              <td>{shortenId(transaction.school_id)}</td>
              <td>{transaction.gateway}</td>
              <td>{transaction.order_amount}</td>
              <td>{transaction.transaction_amount}</td>
              <td className={getStatusClass(transaction.status)}>{transaction.status}</td>
              <td>{transaction.custom_order_id}</td>
            </tr>
          ))}
         </tbody>
      </table>

      {/*<div className="pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>*/}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          {`< Prev`}
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === pageNumbers.length}>
          {`Next >`}
        </button>
      </div>
    </div>
  )
};


export default TransactionList;