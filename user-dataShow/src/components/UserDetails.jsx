import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector(state => state.users.users.find(user => user.id === parseInt(id)));

  if (!user) return <p>User not found</p>;

  return (
    <div className="mx-auto p-4 flex justify-center items-center">
      <div className="bg-red-100 border p-6 rounded-lg shadow-lg bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-300 ease-in-out w-full max-w-md">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">{user.name}</h2>
          <p className="text-gray-600 dark:text-gray-300">Email: {user.email}</p>
          <p className="text-gray-600 dark:text-gray-300">Phone: {user.phone}</p>
          <p className="text-gray-600 dark:text-gray-300">Company: {user.company.name}</p>
          <p className="text-gray-600 dark:text-gray-300">Website: {user.website}</p>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full shadow-md transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
