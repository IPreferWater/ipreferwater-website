import Link from 'next/link'
import Layout from '../components/Layout'
import { getSortedPostsData } from '../pages/api/blog'
import { Post } from '../interfaces/index'
import { CategoriesFlairs } from '../components/CategoriesFlairs'

type IndexProps = {
  posts: Post[]
}
  export default function IndexPage({ posts } : IndexProps) {

    function getIconUrl(url: string): string {
      if (url!="" && url!= null){
        return url
      }
      return "example.png"
    }


  return (<Layout title="IPreferWater's Blog">
    {posts.map(({ id, date, title, description, category, icon }) => (
            <Link  key={id} href={`/blog/${id}`}>
              <a className="flex flex-col md:flex-row bg-gray-100 md:justify-between shadow-md m-4 p-2">
            <div className='flex flex-col'>
            <CategoriesFlairs categories={category}/>
                <div className='text-2xl underline'>{title}</div>
                <div className='ml-2'>{description}</div>

            </div>
            <div className='m-auto md:mr-10'>
            <img className='bg-yellow-400  object-none' src={`${getIconUrl(icon)}`}/>
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
