import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  fetchPostsByTag,
  fetchTags,
  sortPosts,
} from '../redux/posts/posts';
import { useNavigate, useParams } from 'react-router-dom';

export const Home = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  let comments = [];

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (name) {
      dispatch(fetchPostsByTag(name));
    }
    //eslint-disable-next-line
  }, [name]);

  if (posts.item.length) {
    comments = posts.item
      .map((obj) => obj.comments)
      .flat()
      .slice(0, 5);
  }

  const filterPosts = (e) => {
    const selectedFilter = e.target.dataset.value;
    setValue(Number(selectedFilter));
    if (selectedFilter === '0') {
      dispatch(fetchPosts());
      navigate('/');
    } else {
      dispatch(sortPosts());
    }
  };

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={value}
        aria-label='basic tabs example'
        onClick={filterPosts}
      >
        <Tab label='Новые' data-value={0} />
        <Tab label='Популярные' data-value={1} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.item).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={obj._key}
                _id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments?.length || 0}
                tags={obj.tags}
                isEditable={dataUser?._id === obj.user._id}
                comments={obj.comments}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.item} isLoading={isTagsLoading} />
          <CommentsBlock items={comments} isLoading={isPostsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
