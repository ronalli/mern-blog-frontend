import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: {
    item: [],
    status: 'loading',
  },
  tags: {
    item: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});

export default postsSlice.reducer;
