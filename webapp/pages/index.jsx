import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Text, Page, Button, Link, Code } from '@vercel/examples-ui'


import { Layout } from '/components/layout/Layout'
import Token from '/components/Token'
import VipToken from '/components/VipToken'


function Home() {


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



  return (
    <div className="main">
      <h2>NFT SHOP</h2>
      <div className={styles.grid}>
        {tokens.map(function (token, index) {
          return <Token key={index} title={token.title} image={token.image} type={token.type} />
        })}
      </div>
    </div>
  )
}


Home.Layout = Layout

export default Home
