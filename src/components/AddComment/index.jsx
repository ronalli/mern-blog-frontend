import React, { useState } from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAddComment } from '../../redux/posts/posts';

export const Index = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);
  const [value, setValue] = useState();
  const { id } = useParams();

  const onSubmit = () => {
    const data = {
      user: {
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
      },
      text: value,
      postId: id,
    };
    dispatch(fetchAddComment(data, id));
    setValue('');
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={user.avatarUrl} />
        <div className={styles.form}>
          <TextField
            label='Написать комментарий'
            variant='outlined'
            maxRows={10}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            multiline
            fullWidth
          />
          <Button variant='contained' onClick={onSubmit}>
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
