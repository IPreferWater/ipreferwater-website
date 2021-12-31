import Link from 'next/link'
import Layout from '../components/Layout'

import { getSortedPostsData } from '../pages/api/blog'

//todo I should have separate space for "blog" and "projects"
    //todo should I use title instead of create a useless value component inside .md ?
    export default function Blog({ allPostsData }) {



   return ( <Layout title="blog">
        <h1>Projects</h1>
        <p>This is the projects page</p>
        {allPostsData.map(({ id, date, title,  component}) => (
            <li key={id}>
                {title}
                <br />
                {id}
                <br />
                {date}
                <br />
                
            </li>
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

//export default Projects
