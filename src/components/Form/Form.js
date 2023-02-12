import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import useStyles from "./styles";
import { useForm } from "react-hook-form";
import { createPost, updatePost } from "../../actions/posts";
import { InputField } from "../Form-control/InputField";
import { yupResolver } from "@hookform/resolvers/yup";

let schema = yup.object().shape({
  title: yup.string().required("Title required"),
  message: yup.string().required("Message required"),
  // tags: yup.string().required("Tags required"),
});

function Form({ currentId, setCurrentId }) {
    const {token, user} = useSelector((state) => state.auth);

  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const [file, setFile] = useState("");

  const classes = useStyles();

  const dispatch = useDispatch();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      message: "",
      tags: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (post) {
      reset(post)
    };
  }, [currentId]);


  const handleOnSubmit = (data) => {
   
    if(!currentId) {
      dispatch(
        createPost({
          ...data,
          selectedFile: file,
          name: user.name
        })
      );
    } else {
      dispatch(updatePost(currentId, {  ...data, name: user.name,selectedFile: file,
      }));
      reset({});
      setFile("");
    }
  };


  const clear = () => {
    setCurrentId(null);
    setPostData({  title: '', message: '', tags: '', selectedFile: '' });
  };

  if (!token) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form} `}
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Typography variant="h6">{currentId ? `Editing "${post?.title}"` : 'Creating a Memory'}</Typography>

        <InputField
          control={control}
          label="Title"
          name="title"
          errors={errors}
        />
        <InputField
          control={control}
          label="Message"
          name="message"
          errors={errors}
        />
        <InputField
          control={control}
          label="Tags"
          name="tags"
          errors={errors}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setFile(base64)}
          />
        </div>
        {currentId ? (
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Edit
          </Button>
        ) : (
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;


// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Typography, Paper } from '@material-ui/core';
// import { useDispatch, useSelector } from 'react-redux';
// import FileBase from 'react-file-base64';

// import { createPost, updatePost } from '../../actions/posts';
// import useStyles from './styles';

// const Form = ({ currentId, setCurrentId }) => {
//   const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });

//   const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
//   const {token, user} = useSelector((state) => state.auth);

//   const dispatch = useDispatch();

//   const classes = useStyles();
  

//   useEffect(() => {
//     if (post) setPostData(post);
//   }, [post]);

//   console.log(currentId)

//   const clear = () => {
//     setCurrentId(0);
//     setPostData({ title: '', message: '', tags: '', selectedFile: '' });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!currentId) {
//       dispatch(createPost({ ...postData, name: user.name }));
//       clear();
//     } else {
//       dispatch(updatePost(currentId, { ...postData, name: user.name }));
//       clear();
//     }
//   };

//   if (!token) {
//     return (
//       <Paper className={classes.paper}>
//         <Typography variant="h6" align="center">
//           Please Sign In to create your own memories and like other's memories.
//         </Typography>
//       </Paper>
//     );
//   }

//   return (
//     <Paper className={classes.paper}>
//       <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
//         <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
//         <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
//         <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
//         <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
//         <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
//         <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
//         <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
//       </form>
//     </Paper>
//   );
// };

// export default Form;