import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch random data using API with JWT token
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('YOUR_API_ENDPOINT', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('Failed to fetch data:', error);
        });
    }
  }, []);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
      <table>
        <thead>
          <tr>
          
            <th>Name</th>
            <th>Age</th>
            {/* Add more table headers based on your data */}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              {/* Add more table data based on your data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
