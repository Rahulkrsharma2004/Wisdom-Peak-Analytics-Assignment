import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterUsers, sortUsers } from '../redux/userSlice';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

const UserList = () => {
  const dispatch = useDispatch();
  const { filteredUsers, status, error } = useSelector((state) => state.users);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

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

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 400px)' }}>
        <img src="https://www.betterthanpants.com/skin/frontend/btp/default/images/product-loading.gif" alt="Loading..." />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 400px)' }}>
        <p className="text-center text-2xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div className="relative w-full md:w-1/2">
          <MagnifyingGlassIcon className="absolute top-3 left-3 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name"
            onChange={handleSearch}
            className="border p-2 pl-10 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleSort('asc')}
            className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow transition duration-300"
          >
            <ArrowUpIcon className="w-5 h-5 mr-2" /> A-Z
          </button>
          <button
            onClick={() => handleSort('desc')}
            className="flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded shadow transition duration-300"
          >
            <ArrowDownIcon className="w-5 h-5 mr-2" /> Z-A
          </button>
        </div>
      </div>

      <ul>
        {currentUsers.map((user) => (
          <li key={user.id} className="bg-red-100 mb-4 p-4 border rounded-lg shadow hover:shadow-md transition duration-300 bg-white/50 backdrop-blur-lg dark:bg-gray-800/50">
            <p className="text-xl font-bold">Name: {user.name}</p>
            <p className="text-gray-600 dark:text-gray-400">Email: {user.email}</p>
            <p className="text-gray-600 dark:text-gray-400">City: {user.address.city}</p>
            <Link
              to={`/user/${user.id}`}
              className="inline-block mt-2 text-blue-500 hover:underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'
            } rounded-full shadow transition duration-300`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
