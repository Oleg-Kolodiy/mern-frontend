import React, { useState } from "react";
import axios from "axios";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const Index = ({ postId, user }) => {
  const [value, setValue] = useState();

  const onSubmit = async () => {
    try {
      await axios.post(`/comments`, {
        comments: { postId, user, text: value },
      });

      alert("Коментар додано");
    } catch (err) {
      console.warn(err);
      alert("Помилка при відправці коментаря!");
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} />
        <div className={styles.form}>
          <TextField
            value={value}
            label="Написати коментар"
            variant="outlined"
            maxRows={10}
            onChange={({ target }) => setValue(target.value)}
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
