import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {signIn, signOut, useSession} from 'next-auth/client'
import useUser from '../hooks/useUser'
import useFollow from '../hooks/useFollow'

export default function Home({error}) {
  const [session, loading] = useSession()
  const {user, getUser} = useUser()
  const {follow} = useFollow()

  const addCrypto = async event => {
    event.preventDefault() // don't redirect the page

    const res = await fetch(
      `/api/crypto/add`,
      {
        body: JSON.stringify({
          id: session.user.id,
          ticker: event.target.ticker.value,
          address: event.target.address.value
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    ).then(()=>{
      getUser()
    })
  };

  // If loading, try to retrieve a user to trigger a rerender and try again

  if (loading) {
    getUser();
    return <p>Loading...</p>;
  } 

  return (
    <div className={styles.container}>
      <Head>
        <title> AddressTree </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {error && (
          <p style={{
            color: 'red'
          }}>{error}</p>
        )}
        
        {/* if logged in */ }
        
        {!session && (
          <>
          <h1 className={styles.title}> AddressTree </h1>
            <p className={styles.description}>
              Create or join a group to finally decide on a what to do with your homies or that special someone.
            </p>
            {/*  Auth Button */ }
            <button onClick={signIn}>Sign In</button>
          </>
        )}

        {session && (
          <> 
            <p>
              Logged in as {user?.username || getUser()}<br/>
            </p>
            <button onClick={signOut}>Sign Out</button><br/>
            <div>
              <h4>Cryptos</h4>
              <ul>
              {
                  user?.crypto.map((c) => {
                    return <li key={c.ticker}> {c.ticker} : {c.address} </li>
                  }) || getUser()
                }
              </ul>
              <form onSubmit={addCrypto}>
                <label>Add Crypto </label>
                <input id="ticker" type="text" autoComplete="ticker" placeholder="ticker" required />
                <input id="address" type="text" autoComplete="address" placeholder="address" required />
                <button type="submit">Add</button>
              </form>
              
              <h4>Following</h4>
                <ul>
                {
                  user?.following.map((f) => {
                    return (<li key={f.id}> {f.username}  
                            <button onClick={()=>{follow(f.id, f.username, getUser)}}>unfollow</button>
                          </li>)
                  }) || getUser()
                }
              </ul>

            </div>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/dzmndo"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy;{' '}des 2021
        </a>
      </footer>
    </div>
  )
}
