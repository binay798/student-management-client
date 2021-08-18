import React, { useState, useEffect } from 'react';
import classes from './Images.module.scss';
import Paper from '@material-ui/core/Paper';
import Icon from './../../../components/UI/Icon/Icon';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  createImage,
  getImages,
  deleteImage,
} from './../../../store/actionCreators/index';
import { motion } from 'framer-motion';

function Progress(props) {
  const progressStyle = {
    display: props.loading ? 'flex' : 'none',
    padding: '4rem',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <div style={progressStyle}>
      <CircularProgress />
    </div>
  );
}

const mainVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};
const imgVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

function Images() {
  const globalState = useSelector((state) => state.image);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState('');
  const [imgSrc, setImgSrc] = useState(null);
  const [name, setName] = useState('');
  const [copied, setCopied] = useState('');
  const [deleteImageLoading, setDeleteImageLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    dispatch(getImages(setInitialLoading));
  }, [dispatch]);

  const changeHandler = (e) => {
    let file = e.target.files[0];
    console.log(e.target.value);

    setSelectedImage(file);
    const reader = new FileReader();

    reader.addEventListener('load', function () {
      setImgSrc(reader.result);
    });
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createImage(
        selectedImage,
        name,
        [setSelectedImage, setImgSrc, setName],
        setImageUploadLoading
      )
    );
  };

  // copy image url
  const copyUrl = (imgId, url) => {
    navigator.clipboard.writeText(url);
    setCopied(imgId);
  };

  // delete image
  const deleteImageById = (id) => {
    dispatch(
      deleteImage(id, setDeleteImageLoading, [
        setSelectedImage,
        setImgSrc,
        setName,
      ])
    );
  };
  return (
    <div className={classes.images}>
      <div className={classes.images__container}>
        <Paper className={classes.images__container__left}>
          <div className={classes.images__search}>
            <TextField
              variant='outlined'
              className={classes.images__form__inp}
              label='Search images...'
              style={{ flex: 3 }}
            />
            <Button
              variant='contained'
              style={{ flex: 1 }}
              className={classes.btn}
              color='primary'
              startIcon={<Icon name='search' style={{ fill: 'white' }} />}
            >
              Search
            </Button>
          </div>

          {/* loading */}
          <Progress loading={initialLoading} />
          {/* images container */}

          <motion.div
            variants={mainVariant}
            initial='hidden'
            animate='visible'
            className={classes.images__main}
          >
            {globalState.images &&
              globalState.images.map((item, id) => {
                return (
                  <motion.div key={id} variants={imgVariant}>
                    <ImageContent
                      key={item._id}
                      copiedImgId={copied}
                      copied={() => copyUrl(item._id, item.imageUrl)}
                      deleteImage={() => deleteImageById(item._id)}
                      loading={deleteImageLoading}
                      {...item}
                    />
                  </motion.div>
                );
              })}
          </motion.div>
        </Paper>

        <Paper className={classes.images__container__right}>
          <form onSubmit={submitHandler} className={classes.images__form}>
            {imgSrc ? (
              <img
                className={classes.images__preview}
                src={imgSrc}
                alt='preview'
              />
            ) : (
              <Icon
                name='image'
                style={{ width: '20rem', height: '20rem', margin: '0 auto' }}
              />
            )}
            <div className={classes.images__form__img}>
              <label className={classes.label} htmlFor={classes.file}>
                Choose
              </label>
              <input
                onChange={changeHandler}
                type='file'
                id={classes.file}
                accept='image/*'
              />
              <TextField
                className={classes.images__form__inp}
                variant='outlined'
                label='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <Button
              type='submit'
              className={classes.btn}
              variant='contained'
              color='primary'
              disabled={imageUploadLoading}
            >
              {imageUploadLoading ? 'Please wait...' : 'Confirm'}
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
}

const ImageContent = (props) => {
  return (
    <div className={classes.img}>
      <img src={props.imageUrl} alt='content' />
      <div className={classes.img__overlay}>
        <p>{props.name}</p>
        <Button
          data-text='hello'
          onClick={props.copied}
          variant={props.copiedImgId === props._id ? 'contained' : 'outlined'}
          color='primary'
        >
          {props.copiedImgId === props._id ? 'Copied' : 'Copy url'}
        </Button>
        <Button
          onClick={props.deleteImage}
          variant='outlined'
          color='secondary'
        >
          {props.loading ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </div>
  );
};

export default Images;
