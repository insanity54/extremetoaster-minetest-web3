import React from "react";
import Dom from "/components/layout/Dom";
import dynamic from "next/dynamic";
import Link from "next/link";
import styles from '../../styles/Home.module.css'

const Canvas = dynamic(() => import("/components/layout/Canvas"), {
  ssr: false,
});

export default function Layout ({children}) {
  
  return (
    <>
      <main>
        <h1>EXTREMETOASTER</h1>
        {children}
      </main>
      <footer className={styles.footer}>
        <a href="https://extremetoaster.com">Extremetoaster.com</a>
        <a href="https://discord.gg/TrMKYHsGUn">Extremetoaster Discord</a>
        <Link href="/proveyou">Account Verification</Link>
      </footer>
    </>
  )
}
