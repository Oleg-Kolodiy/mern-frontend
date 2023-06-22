import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "../axios";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
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
          data.imageUrl ? `${"http://localhost:9999"}${data.imageUrl}` : ""
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
        items={
          data.comments || [
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
          ]
        }
        isLoading={false}
      >
        <Index postId={data._id} user={data.user} />
      </CommentsBlock>
    </>
  );
};
