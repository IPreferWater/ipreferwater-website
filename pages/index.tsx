import Link from 'next/link'
import Layout from '../components/Layout'
import { getSortedPostsData } from '../pages/api/blog'
import { Post } from '../interfaces/index'

type IndexProps = {
  posts: Post[]
}
  export default function IndexPage({ posts } : IndexProps) {

  return (<Layout title="Home | Next.js + TypeScript Example">
    <h1>Blog</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    {posts.map(({ id, date, title }) => (
            <Link href={`/blog/${id}`}>
              <a className="underline decoration-sky-500">
            <li key={id}>
         {title} {date}
      </li>
      </a>
          </Link>
      
    ))}
  </Layout>)
}

export async function getStaticProps() {
  const posts = getSortedPostsData() as Post[]
  console.log(posts)
  return {
    props: {
      posts
    }
  }
}
