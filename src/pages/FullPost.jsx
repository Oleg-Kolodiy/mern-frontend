import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { fetchAuthMe, selectId } from "../redux/slices/auth";
import axios from "../axios";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const [comments, setComments] = React.useState([]);
  const updateComments = (value) => setComments((prev) => [...prev, value]);

  const { id } = useParams();

  const dispatch = useDispatch();
  const currentUserId = useSelector(selectId);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Помилка при отриманні посту");
      });
  }, [id]);

  React.useEffect(() => {
    axios
      .get(`/posts/${id}/comments`)
      .then((res) => {
        setLoading(true);
        setComments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Помилка при додаванні коментаря");
      });
  }, [id]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  if (!data) return null;

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl ? `${"http://localhost:7777"}${data.imageUrl}` : ""
        }
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={comments?.length || data.commentsCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={comments} isLoading={isLoading}>
        <Index
          postId={data._id}
          userId={currentUserId}
          updateComments={updateComments}
        />
      </CommentsBlock>
    </>
  );
};
