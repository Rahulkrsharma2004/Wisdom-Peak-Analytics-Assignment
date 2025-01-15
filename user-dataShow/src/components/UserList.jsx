import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterUsers, sortUsers } from '../redux/userSlice';
import { Link } from 'react-router-dom';

const UserList = () => {
  const dispatch = useDispatch();
  const { filteredUsers, status, error } = useSelector((state) => state.users);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const handleSearch = (e) => {
    dispatch(filterUsers(e.target.value));
  };

  const handleSort = (order) => {
    dispatch(sortUsers(order));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name"
          onChange={handleSearch}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <div>
          <button
            onClick={() => handleSort('asc')}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            A-Z
          </button>
          <button
            onClick={() => handleSort('desc')}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Z-A
          </button>
        </div>
      </div>
      <ul>
        {currentUsers.map((user) => (
          <li key={user.id} className="mb-4 p-4 border rounded shadow">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>City: {user.address.city}</p>
            <Link to={`/user/${user.id}`} className="text-blue-500">
              View Details
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
            } rounded shadow`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
