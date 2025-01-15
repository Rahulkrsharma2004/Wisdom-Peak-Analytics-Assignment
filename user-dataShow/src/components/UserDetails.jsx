import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector(state => state.users.users.find(user => user.id === parseInt(id)));

  if (!user) return <p>User not found</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="border p-4 rounded shadow">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Company: {user.company.name}</p>
        <p>Website: {user.website}</p>
      </div>
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-500 text-white rounded">Go Back</button>
    </div>
  );
};

export default UserDetails;
