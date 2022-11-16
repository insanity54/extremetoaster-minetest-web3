import { Text, Page, Button } from '@vercel/examples-ui'
import { getSession } from 'next-auth/react'
import { NextPageContext } from 'next'
import { Layout } from '/components/Layout'

import { useProtected } from '../hooks/useProtected'

function Protected() {
  const handleLogout = useProtected()

  return (
    <div>
      <p>This is the protected page</p>
      <p>this is where players will enter their IGN</p>
      <input type="text" id="ign"></input>
    </div>
  )
}

Protected.Layout = Layout

export default Protected

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}