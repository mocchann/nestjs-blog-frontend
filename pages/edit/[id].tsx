import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import { getAllPosts, getPostById, updatePostById } from "../../utils/api";
import { PostType } from "../../utils/Type";
import React, { useEffect, useState } from "react";

type Props = {
  post: PostType;
};

export async function getServerSideProps({ params }: any) {
  const post: PostType = await getPostById(params.id);

  return {
    props: {
      post,
    },
  };
}

const Edit = ({ post }: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    author: post.author,
  });

  useEffect(() => {
    setFormData({
      title: post.title,
      content: post.content,
      author: post.author,
    });
  }, [post]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePostById(post.id);
      router.push(`/posts/${post.id}`);
    } catch (error) {
      console.error("failed to update post:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>EDIT: {post.title}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={styles.form}
        />
        <input
          type="text"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className={styles.form}
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className={styles.form}
        />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default Edit;
