import React from "react";
import axios from "axios";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const Index = ({
  postId,
  user,
  commentValue,
  setCommentValue,
  setComments,
}) => {
  const onSubmit = async () => {
    try {
      // await axios.patch(`/posts/${postId}`, {
      //   comments: { user, text: commentValue },
      // });

      setComments({
        user: {
          id: user,
          fullName: "Oleg",
        },
        text: commentValue,
      });

      setCommentValue("");
    } catch (err) {
      // console.warn(err);
      // alert("Помилка при відправці коментаря!");
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} />
        <div className={styles.form}>
          <TextField
            value={commentValue}
            label="Написати коментар"
            variant="outlined"
            maxRows={10}
            onChange={({ target }) => setCommentValue(target.value)}
            multiline
            fullWidth
          />
          <Button variant="contained" onClick={onSubmit}>
            Надіслати
          </Button>
        </div>
      </div>
    </>
  );
};
