import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterUsers, sortUsers } from '../redux/userSlice';
import { Link } from 'react-router-dom';

const UserList = () => {
  const dispatch = useDispatch();
  const { filteredUsers, status, error } = useSelector(state => state.users);

  const handleSearch = (e) => {
    dispatch(filterUsers(e.target.value));
  };

  const handleSort = (order) => {
    dispatch(sortUsers(order));
  };

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
          <button onClick={() => handleSort('asc')} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">A-Z</button>
          <button onClick={() => handleSort('desc')} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Z-A</button>
        </div>
      </div>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id} className="mb-4 p-4 border rounded shadow">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>City: {user.address.city}</p>
            <Link to={`/user/${user.id}`} className="text-blue-500">View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
