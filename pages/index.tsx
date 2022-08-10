import type { NextPage } from 'next';

import Auth from './Auth/Auth';

import "../firebase.config";

const Home: NextPage = () => {

  return (
    <main className="main">
      <Auth/>
    </main>
  )
}

export default Home
