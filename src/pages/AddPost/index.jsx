import React, { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/auth/auth';
import axios from '../../utils/axios';

export const AddPost = () => {
  const isAuth = useSelector(selectIsAuth);
  const inputFileRef = useRef(null);

  const [imageUrl, setImageUrl] = useState();

  const [value, setValue] = useState();
  const [title, setTitle] = useState();
  const [tags, setTags] = useState();

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/uploads', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при загрузке изображения');
    }
  };

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem('token') && !isAuth)
    return <Navigate to='/' />;

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant='outlined'
        size='large'
      >
        Загрузить превью
      </Button>
      <input
        type='file'
        ref={inputFileRef}
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <Button variant='contained' color='error' onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img
          className={styles.image}
          src={`http://localhost:4444${imageUrl}`}
          alt='Uploaded'
        />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant='standard'
        placeholder='Заголовок статьи...'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant='standard'
        placeholder='Тэги'
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size='large' variant='contained'>
          Опубликовать
        </Button>
        <a href='/'>
          <Button size='large'>Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
