import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import axios from "../../axios";

export const Index = ({ postId, userId, updateComments }) => {
  const [commentValue, setCommentValue] = React.useState("");

  const onSubmit = async () => {
    try {
      const { data } = await axios.post(`/posts/${postId}/comments`, {
        user: userId,
        text: commentValue,
      });

      updateComments(data);
      setCommentValue("");
    } catch (err) {
      console.warn(err);
      alert("Помилка при додаванні коментаря!");
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
