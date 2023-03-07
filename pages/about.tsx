import Link from 'next/link'
import Layout from '../components/Layout'

const AboutPage = () => (
  <Layout title="IPreferWater About me">
    <h1>About</h1>
    <p>I'm a dev, so I'm not really good at describing me</p>
    <p>
      <Link href="/">
        <a>Go to the main page to see actually interesting stuff</a>
      </Link>
    </p>
  </Layout>
)

export default AboutPage
