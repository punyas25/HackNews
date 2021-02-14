import React from 'react'
import Head from 'next/head'

const App = ({ children}) => {
  return (
    <div className="">
      <Head>
        <title>Hack News</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
        name="description"
        content="Hack News: Latest Hackathon information"
        />
      </Head>
      <section>
        {children}
      </section>
    </div>
  );
}

export default App;
