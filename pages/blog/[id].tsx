

import { getAllPostIds, getPostData  } from '../../pages/api/blog'
import Layout from '../../components/Layout'
import AvroConverter from '../../components/blog/AvroConverter';
import TailwindV3 from '../../components/blog/TailwindV3';

export default function Post({ postData }) {
    function getComponent(componentName: string) {
        switch (componentName) {
            case 'avro-to-schema-curl':
              return <AvroConverter/>
              case 'tailwind-v3':
                return <TailwindV3/>
            default:
              return <div></div>
          }
       }

    return (
      <Layout>
          <div className="flex flex-row">
              <div>{postData.title}</div>
              <div>{postData.date}</div>
              <div>{getComponent(postData.component)}</div>
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
