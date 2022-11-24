import 'bulma/css/bulma.min.css';
import "bulma-prefers-dark/css/bulma-prefers-dark.css";
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import Layout from '/components/layout/Layout'



function MyApp({ Component, pageProps }) {
  const client = createClient({
    autoConnect: true,
    provider: getDefaultProvider(),
  })

  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </WagmiConfig>
  )
}

export default MyApp
