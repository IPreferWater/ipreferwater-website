

import { getAllPostIds, getPostData  } from '../../pages/api/blog'
import Layout from '../../components/Layout'
import AvroConverter from '../../components/blog/AvroConverter';
import TailwindV3 from '../../components/blog/TailwindV3';
import ListWowStyle from '../../components/list-wow-style/ListWowStyle';

export default function Post({ postData }) {
    function getComponent(componentName: string) {
        switch (componentName) {
            case 'avro-to-schema-curl':
              return <AvroConverter/>
              case 'tailwind-v3':
                return <TailwindV3/>
              case 'list-wow-style':
                return <ListWowStyle/>
            default:
              return <div></div>
          }
       }

    return (
      <Layout>
          <div className="flex flex-col">
              <div>{postData.title}</div>
              <div>{postData.date}</div>
              <div className='m-auto bg-red-100'>{getComponent(postData.component)}</div>
        </div>
      </Layout>
    )
  }


export async function getStaticProps({ params }) {
    const postData = getPostData(params.id)
    return {
      props: {
        postData
      }
    }
  }

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}
