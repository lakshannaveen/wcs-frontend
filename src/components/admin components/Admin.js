import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Fetch all admins on component mount
    fetch("http://localhost:5002/api/admin/admins")
      .then((response) => response.json())
      .then((data) => {
        setAdmins(data);
      })
      .catch((error) => {
        console.error('Error fetching admins:', error);
      });
  }, []);

  const handleDelete = (adminId) => {
    // Confirm before deleting the admin
    const isConfirmed = window.confirm("Are you sure you want to delete this admin?");
    if (isConfirmed) {
      // Delete the admin by their ID
      fetch(`http://localhost:5002/api/admin/admin/${adminId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          // Remove the deleted admin from the state
          setAdmins(admins.filter(admin => admin.id !== adminId));
          alert('Admin deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting admin:', error);
          alert('Failed to delete admin');
        });
    }
  };

  return (
    <div className="admin-welcome-container">
      <h1>Admins</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.email}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(admin.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
