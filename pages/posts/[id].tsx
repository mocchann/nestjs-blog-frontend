import React from "react";
import styles from "../../styles/Home.module.css";
import { PostType } from "../../utils/Type";
import { getAllPosts, getPostById } from "../../utils/api";
import Link from "next/link";

type Props = {
  post: PostType;
};

export async function getStaticProps({ params }: any) {
  const post: PostType[] = await getPostById(params.id);

  return {
    props: {
      post,
    },
  };
}

// post/1,2,3...
export async function getStaticPaths() {
  const posts = await getAllPosts();
  const paths = posts.map((post: PostType) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

const Post = ({ post }: Props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <button>
        <Link className={styles.editBtn} href={`/edit/${post.id}`}>edit</Link>
      </button>
      <p className={styles.content}>{post.content}</p>
      <p className={styles.meta}>Author: {post.author}</p>
      <p className={styles.meta}>Create At: {post.createdAt}</p>
    </div>
  );
};

export default Post;
