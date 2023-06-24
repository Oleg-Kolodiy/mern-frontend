import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "../axios";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

const FAKE_COMMENTS = [
  {
    user: {
      fullName: "Test",
      avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
    },
    text: "Файно",
  },
  {
    user: {
      fullName: "John New",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBlA2ZLG5P84pkwwj_mmp4NhFaVnhq7hdxoOwYIy8&s",
    },
    text: "Мені подобається, це гарно!",
  },
  {
    user: {
      fullName: "Test",
    },
    text: "Це тестовий коментар.",
  },
];

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const [commentValue, setCommentValue] = React.useState("");
  const [fakeComments, setFakeComments] = React.useState(FAKE_COMMENTS);
  const setComments = (value) => setFakeComments((prev) => [...prev, value]);

  const { id } = useParams();

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
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

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
        commentsCount={data.comments?.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={data.comments.length ? data.comments : fakeComments}
        isLoading={false}
      >
        <Index
          postId={data._id}
          user={data.user}
          commentValue={commentValue}
          setComments={setComments}
          setCommentValue={setCommentValue}
        />
      </CommentsBlock>
    </>
  );
};
