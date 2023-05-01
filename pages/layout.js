import { Footer, Navbar } from '../components'
import Head from 'next/head'

export function Layout({ children }) {
  return (
    <div className='layout'>
      <Head>
        <title>
          Azeros
        </title>
      </Head>
      <header>
        <Navbar />
      </header>

      <main className='main-container'>
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}
