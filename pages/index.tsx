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
    {posts.map(({ id, date, title, description }) => (
            <Link  key={id} href={`/blog/${id}`}>
              <a className="flex flex-col md:flex-row bg-gray-100 md:justify-between shadow-md m-4 p-2">

                
            
            <div className='flex flex-col'>
              <div className='flex flex-row'>
            <div className='bg-blue-700 rounded-xl p-1 text-white'>code</div>
            <div className='bg-blue-700 rounded-xl p-1 text-white'>code</div>
            <div className='bg-blue-700 rounded-xl p-1 text-white'>code</div>
            </div>
                <div className='text-2xl underline'>{title}</div>
                <div className='ml-2'>{description}</div>

            </div>
            <div className='m-auto md:mr-10'>
            <img className='bg-yellow-400  object-none' src='example.png'/>
            </div>
      </a>
          </Link>
      
    ))}
  </Layout>)
}

export async function getStaticProps() {
  const posts = getSortedPostsData() as Post[]
  return {
    props: {
      posts
    }
  }
}
