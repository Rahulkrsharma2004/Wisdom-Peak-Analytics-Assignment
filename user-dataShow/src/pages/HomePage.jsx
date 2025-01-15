import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/userSlice';
import UserList from '../components/UserList';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">User Directory</h1>
      <UserList />
    </div>
  );
};

export default HomePage;
