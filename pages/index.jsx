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


function Home() {
  const { address, connector, isConnected } = useAccount()

  const [connected, setConnected] = useState(false)

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);


  // @todo make this fetched from blochchain
  const tokens = [
    // { title: 'Gejmrovec', image: '/images/Gejmrovec_by_From_Minecraft_Gejmrovec.png'},
    // { title: 'Jordach', image: '/images/Jordach_by_Jordach.png'},
    // { title: 'SirYakari with clothes', image: '/images/SirYakari_with_clothes_by_SirYakari.png'}
    { title: "VIP", image: '/images/vip0.png', type: 'sin' },
    { title: "VIP", image: '/images/vip1.png', type: 'sin' },
    { title: "VIP", image: '/images/vip2.png', type: 'sin' },
    { title: "VIP", image: '/images/vip3.png', type: 'sin' },
    { title: "VIP", image: '/images/vip4.png', type: 'sin' },
    { title: "VIP", image: '/images/vip5.png', type: 'sin' },
    { title: "VIP", image: '/images/vip6.png', type: 'sin' },
    { title: 'Male', image: '/images/Male_by_yotuderconnect.png', type: 'skin' },
  ]

  // const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  return (
    <div className="main">
      <h2>NFT SHOP</h2>
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
      <div className={styles.grid}>
        {tokens.map(function (token, index) {
          return <Token key={index} title={token.title} image={token.image} type={token.type} />
        })}
      </div>
    </div>
  )

  // if (isConnected) {
  //   return (
  //     <div>
  //       Connected to {address}
  //       <button onClick={() => disconnect()}>Disconnect</button>
  //     </div>
  //   )
  // } else {
  //   return (
  //     <>
  //       <button onClick={() => connect()}>Connect Wallet</button>
  //     </>
  //   )
  // }

  // const [{ connectData }, connect = useConnect()
  // const [{ accountData }] = useAccount()
  // const metamaskInstalled = connectData.connectors[0].name === 'MetaMask'

  // const handleLogin = async () => {
  //   try {
  //     const callbackUrl = '/protected'
  //     if (accountData?.address) {
  //       signIn('credentials', { address: accountData.address, callbackUrl })
  //       return
  //     }
  //     const { data, error } = await connect(connectData.connectors[0])
  //     if (error) {
  //       throw error
  //     }
  //     signIn('credentials', { address: data?.account, callbackUrl })
  //   } catch (error) {
  //     window.alert(error)
  //   }
  // }

  // return (
  //   <div className={styles.container}>
  //     <Head>
  //       <title>EXTREMETOASTER SKINS</title>
  //       <meta name="description" content="EXTREMETOASTER NFT MINETEST SKINS DATABASE" />
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>

  //     <main className={styles.main}>
        
  //     </main>

  //   </div>
  // )
}


Home.Layout = Layout

export default Home
