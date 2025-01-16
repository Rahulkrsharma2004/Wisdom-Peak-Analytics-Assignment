import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    filteredUsers: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    filterUsers: (state, action) => {
      const searchQuery = action.payload.toLowerCase();
      state.filteredUsers = state.users.filter(user =>
        user.name.toLowerCase().includes(searchQuery)
      );
    },
    sortUsers: (state, action) => {
      const sortOrder = action.payload;
      state.filteredUsers = [...state.filteredUsers].sort((a, b) => {
        if (sortOrder === 'asc') return a.name.localeCompare(b.name);
        return b.name.localeCompare(a.name);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { filterUsers, sortUsers } = userSlice.actions;

export default userSlice.reducer;
