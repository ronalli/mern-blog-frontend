import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './posts/posts';

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
