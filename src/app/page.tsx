import styles from './page.module.css';
import Link from 'next/link';

export default async function Home() {

  return (
    <section className={styles.main}>
      <h1>Hello nextAuth.js</h1>
      <Link href="/register">Register</Link>
      <Link href="/login">Login</Link>
      <Link href="/dashboard">Dashboard</Link>
    </section>
  )
}
