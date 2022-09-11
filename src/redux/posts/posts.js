import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async (id) => axios.delete(`/posts/${id}`)
);

export const fetchPostsByTag = createAsyncThunk(
  'posts/fetchPostsByTag',
  async (value) => {
    const { data } = await axios.get(`/tags/${value}`);
    return data;
  }
);

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
  reducers: {
    sortPosts: (state) => {
      state.posts.item = state.posts.item.sort(
        (a, b) => b.viewsCount - a.viewsCount
      );
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.item = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.item = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.item = [];
      state.posts.status = 'error';
    },
    [fetchTags.pending]: (state) => {
      state.tags.item = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.item = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.item = [];
      state.tags.status = 'error';
    },
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.item = state.posts.item.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
    [fetchPostsByTag.pending]: (state) => {
      state.posts.item = [];
      state.posts.status = 'loading';
    },
    [fetchPostsByTag.fulfilled]: (state, action) => {
      state.posts.item = action.payload;
      state.posts.status = 'loaded';
    },
  },
});

export const { sortPosts } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
