// 404.js
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function FourOhFour() {
  return (
  <div className={styles.container}>
    <main className={styles.main}>
        <h1 className={styles.title}>
            faux oh faux
        </h1>
        <small>Looks like we don't have it :/</small><br/><br/>
    <Link href="/">
      <a>
        Go home
      </a>
    </Link>
    </main>
  </div>
  )
}