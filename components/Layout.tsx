import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import 'tailwindcss/tailwind.css'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav className='flex flex-col md:flex-row md:items-end justify-between mr-8'>

      <Link href="/">
        <a className='flex flex-row items-end'>
        <img src="logo.png"/>
        <h1 className='text-2xl md:text-6xl'>IPreferWater</h1>
        </a>
        </Link>

        <Link href="/about">
      <a className='bg-blue-100 text-xl md:text-4xl'>about</a>
      </Link>
      </nav>
    </header>
    {children}
  </div>
)

export default Layout
