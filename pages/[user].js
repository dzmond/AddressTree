import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link  from 'next/link'
import {useSession} from 'next-auth/client'
import useUser from '../hooks/useUser'

export default function User({userData}) {

  const [session, loading] = useSession();
  const {user, getUser} = useUser()

  const followUser = async (id, username) => {
      const res = await fetch(
        `/api/user/follow`,
        {
          body: JSON.stringify({
            id: userData.userID,
            username: userData.username
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      ).then(()=>{
        getUser();
      })
    }

  const followLabel = () => {

    const {userID:id, username} = userData;
    const following = JSON.stringify(user.following).includes(JSON.stringify({id, username}));

    // having this line here isnt ideal
    // but i can't for the life of me replicate this issue 
    // while divine intervention repeatedly fixes and breaks it :/
    // at least it happens much less frequently with this ¯\_(ツ)_/¯
    if (!user) getUser() 

    return following? "Following" : "Follow";
  }


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
          <h3 className={styles.title}>
            {userData.username}'s crypto
          </h3>
          {session && (session.user.id != userData.userID) && (
            <button onClick={followUser}>{followLabel()}</button>
          )}
              <ul>
                {
                  userData?.crypto.map((c) => {
                    return <li key={c.ticker}> {c.ticker} : {c.address} </li>
                  }) || getUser()
                }
              </ul>
          <Link href="/"> Go home </Link>
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
  

 User.getInitialProps = async (context) => {
  const { req, res } = context
   const {user} = context.query;
   const userData = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user/${user}`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    }
  ).then(response => {
    return response.json()
  }).catch(e => {
    // Looks like no user was returned
    //or something went wrong
    res.writeHead(302, {
      Location: '/404'
    });
  
    res.end();
    return {};
  })
    return {userData};
}