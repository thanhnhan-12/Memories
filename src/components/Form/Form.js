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
  tags: yup.string().required("Tags required"),
  creator: yup.string().required("Creator required"),
});

function Form({ currentId, setCurrentId }) {
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
      creator: "",
      title: "",
      message: "",
      tags: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (post) reset(post);
  }, [post]);

  const handleOnSubmit = (data) => {
    dispatch(
      createPost({
        ...data,
        selectedFile: file,
      })
    );
    // reset(null);
    // setFile("");
    clear();
  };

  const clear = () => {
    // reset(null);
    // setFile("");
    setCurrentId(0);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form} `}
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <InputField
          control={control}
          label="Creator"
          name="creator"
          errors={errors}
          value={postData.creator}
          onChange={(e) => setPostData({...postData, creator: e.target.value})}
        />
        <InputField
          control={control}
          label="Title"
          name="title"
          errors={errors}
          value={postData.title}
          onChange={(e) => setPostData({...postData, title: e.target.value})}
        />
        <InputField
          control={control}
          label="Message"
          name="message"
          errors={errors}
          value={postData.message}
          onChange={(e) => setPostData({...postData, message: e.target.value})}
        />
        <InputField
          control={control}
          label="Tags"
          name="tags"
          errors={errors}
          value={postData.tags}
          onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setFile(base64)}
          />
        </div>
        {post ? (
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
