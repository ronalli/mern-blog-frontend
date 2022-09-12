import React, { useEffect, useState } from 'react';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/auth/auth';
import { selectIsLoadingComments } from '../redux/posts/posts';

export const FullPost = () => {
  const [data, setData] = useState(null);
  const isLoadindComments = useSelector(selectIsLoadingComments);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line
  }, [isLoadindComments]);

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments?.length || 0}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={data.comments} isLoading={false}>
        {isAuth ? <Index /> : ''}
      </CommentsBlock>
    </>
  );
};
