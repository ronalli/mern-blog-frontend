import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/auth';
import { postsReducer } from './posts/posts';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

export default store;
