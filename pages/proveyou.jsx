import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic";
import { Text, Page, Button, Link, Code } from '@vercel/examples-ui'
import { signIn } from 'next-auth/react'
import { useConnect, useDisconnect, useAccount } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Layout } from '/components/layout/Layout'
import { useState, useEffect } from 'react'
import Token from '/components/Token'
import VipToken from '/components/VipToken'


function ProveYou() {
  const { address, connector, isConnected } = useAccount()

  const [connected, setConnected] = useState(false)

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);


  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  return (
    <>
      {connected && address && <>
          <p>Connected to {address}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </>
      }
      {!connected && <>
          <p>Not connected to web3 wallet</p>
          <button onClick={() => connect()}>Connect Wallet</button>
        </>
      }

      <h2>Account Verification</h2>
      <p>Link your in-game account to your web3 wallet. This is used to grant NFT entitlements to your in-game character.</p>
      <form onSubmit={(evt) => { evt.preventDefault(); console.log(ign.value) }}>
        <label htmlFor="ign">IGN (case sensitive):</label>
        <input ref={ign} id="ign" type="text"></input>
        <button>Verify</button>
      </form>


      <div className={styles.buffer}></div>
    </>
  )

}


ProveYou.Layout = Layout

export default ProveYou
