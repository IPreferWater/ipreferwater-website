import Link from 'next/link'
import Layout from '../components/Layout'
import LoadWasm from '../components/LoadWasm'



const AboutPage = () => (
  <Layout title="IPreferWater About me">
    <h1>About</h1>
    <p>I'm a dev, so I'm really good at describing me</p>
    <p>
      <Link href="/">
        <a>Go to the main page to see actually intersting stuff</a>
      </Link>
    </p>
    <LoadWasm/>
  </Layout>
)

export default AboutPage
