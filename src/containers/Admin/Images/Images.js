import React, { useState, useEffect } from 'react';
import classes from './Images.module.scss';
import Paper from '@material-ui/core/Paper';
import Icon from './../../../components/UI/Icon/Icon';
import { TextField, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  createImage,
  getImages,
  deleteImage,
} from './../../../store/actionCreators/index';
import { motion } from 'framer-motion';
import axios from './../../../axios-instance/axiosInstance';
import Progress from '../../../components/UI/ProgressBar/ProgressBar';

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
  const dispatch = useDispatch();

  const [initialLoading, setInitialLoading] = useState(false);
  const [searchedImages, setSearchedImages] = useState(null);
  const [searchField, setSearchField] = useState('');

  // GET IMAGES FROM THE SERVER
  useEffect(() => {
    dispatch(getImages(setInitialLoading));
  }, [dispatch]);

  // SEARCH IMAGE
  const searchImage = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.get(`/api/v1/images/search?name=${searchField}`);
      setSearchedImages(res.data.images);
    } catch (err) {
      console.log(err.message);
    }
  };

  //RESET SEARCHED IMAGES
  const resetSearchedImages = () => {
    setSearchedImages(null);
    setSearchField('');
  };
  return (
    <div className={classes.images}>
      <div className={classes.images__container}>
        <Paper className={classes.images__container__left}>
          {/* SEARCH IMAGE FORM */}
          <form onSubmit={searchImage} className={classes.images__search}>
            <TextField
              variant='outlined'
              className={classes.images__form__inp}
              label='Search images...'
              style={{ flex: 3 }}
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            />
            <Button
              variant='contained'
              style={{ flex: 1 }}
              className={classes.btn}
              color='primary'
              startIcon={<Icon name='search' style={{ fill: 'white' }} />}
              type='submit'
            >
              Search
            </Button>
          </form>
          {/* RESET SEARCHED IMAGES BUTTON */}
          <Button
            style={{
              display: searchedImages ? 'block' : 'none',
              marginTop: '1rem',
            }}
            variant='contained'
            color='secondary'
            onClick={resetSearchedImages}
          >
            Reset
          </Button>
          {/* PROGRESS BAR */}
          <Progress loading={initialLoading} />

          {/* ALL IMAGES CONTAINER */}
          <ImagesContainer searchedImages={searchedImages} />
        </Paper>

        <UploadImage />
      </div>
    </div>
  );
}

// DISPLAY IMAGES
const ImagesContainer = (props) => {
  const globalState = useSelector((state) => state.image);
  const dispatch = useDispatch();

  const [copied, setCopied] = useState('');
  const [deleteImageLoading, setDeleteImageLoading] = useState(false);

  // copy image url
  const copyUrl = (imgId, url) => {
    navigator.clipboard.writeText(url);
    setCopied(imgId);
  };

  // delete image
  const deleteImageById = (id) => {
    dispatch(deleteImage(id, setDeleteImageLoading));
  };

  return (
    <>
      {/* IMAGES CONTAINER */}

      <motion.div
        variants={mainVariant}
        initial='hidden'
        animate='visible'
        className={classes.images__main}
      >
        {!props.searchedImages &&
          globalState.images &&
          globalState.images.map((item) => {
            return (
              <motion.div key={item._id} variants={imgVariant}>
                <ImageContent
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

      <motion.div
        variants={mainVariant}
        initial='hidden'
        animate='visible'
        className={classes.images__main}
      >
        {props.searchedImages &&
          props.searchedImages.map((item) => {
            return (
              <motion.div key={item._id} variants={imgVariant}>
                <ImageContent
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
    </>
  );
};

// INDIVIDUAL IMAGE
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

// UPLOAD IMAGE TO SERVER
const UploadImage = (props) => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState('');
  const [imgSrc, setImgSrc] = useState(null);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [name, setName] = useState('');

  const changeHandler = (e) => {
    let file = e.target.files[0];

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
  return (
    <>
      {/* UPLOAD IMAGES TO SERVER */}

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
    </>
  );
};

export default Images;
