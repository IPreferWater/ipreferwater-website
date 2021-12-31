import Link from 'next/link'
import Layout from '../components/Layout'
import { getSortedPostsData } from '../pages/api/blog'

//const IndexPage = () => (
  export default function IndexPage({ allPostsData }) {

  return (<Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>

    {allPostsData.map(({ id, date, title, component }) => (
            <Link href={`/blog/${id}`}>
              <a className="underline decoration-blue">
            <li key={id}>
        {id} {title} {date}
      </li>
      </a>
          </Link>
      
    ))}
  </Layout>)
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
