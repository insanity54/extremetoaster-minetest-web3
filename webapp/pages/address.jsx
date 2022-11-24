import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic";
import { Text, Page, Button, Link, Code } from '@vercel/examples-ui'

import { Layout } from '/components/layout/Layout'
import { useState, useEffect } from 'react'
import Token from '/components/Token'
import VipToken from '/components/VipToken'


function ProveYou() {

  const [ign, setIgn] = useState("singleplayer")

  return (
    <div className="main">
      <div className="section">
        <h2 className="title">Account Verification</h2>
        <p>Link your in-game account to your web3 wallet. This is used to grant NFT entitlements to your in-game character.</p>
        <form onSubmit={(evt) => { evt.preventDefault(); console.log(ign.value) }}>
          <label htmlFor="ign">IGN (case sensitive):</label>
          <input id="ign" type="text"></input>
          <button>Verify</button>
        </form>


        <div className={styles.buffer}></div>
      </div>
    </div>
  )

}


ProveYou.Layout = Layout

export default ProveYou
