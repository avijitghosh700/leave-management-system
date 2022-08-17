import type { NextPage } from 'next';

// import Auth from './Auth';
import Dashboard from './Dashboard';

import "../firebase.config";

const Home: NextPage = () => {

  return (
    <main className="main">
      <Dashboard/>
    </main>
  )
}

export default Home
