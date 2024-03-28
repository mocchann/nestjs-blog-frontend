import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getAllPosts } from '../utils/api'
import { PostType } from '../utils/Type';
import Link from 'next/link';

type Props = {
  posts: PostType[];
};

export async function getStaticProps() {
  const posts: PostType[] = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1>Nest.js Blog</h1>
        <ul className={styles.postList}>
          {posts.map((post: PostType) => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <li className={styles.post} key={post.id}>
                <h2 className={styles.title}>{post.title}</h2>
                <p className={styles.author}>{post.author}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  )
}
