import Link from "next/link";
import { Button } from 'react-bulma-components';
import { useConnect, useDisconnect, useAccount } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useState, useEffect } from 'react'
import Identicon from 'react-identicons';

// import { signIn } from 'next-auth/react'
// import dynamic from "next/dynamic";




export default function Nav({ title, image, type }) {

    const [connected, setConnected] = useState(false)

    const { address, connector, isConnected } = useAccount()

    useEffect(() => {
        setConnected(isConnected);
    }, [isConnected]);


    const { connect } = useConnect({
        connector: new InjectedConnector()
    })
    const { disconnect } = useDisconnect()

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" href="/">
              EXTREMETOASTER
            </Link>
            <Link className="navbar-item" href="/shop">Shop</Link>
            {connected && address && <>
                <Link className="navbar-item" href="/create">Create</Link>
                <div className="navbar-item">
                    <div className="buttons">
                        <button className="button navbar-item" onClick={() => disconnect()}>Disconnect</button>
                    </div>
                </div>
                <div className="navbar-item">
                    <Link className="navbar-item" href="/address">
                        <Identicon value={address} size={32} />
                    </Link>
                </div>
            </>
            }
            {!connected && <>
                <div className="navbar-item">
                    <div className="buttons">
                        <button className="button navbar-item" onClick={() => connect()}>Connect Wallet</button>
                    </div>
                </div>
            </>
            }

          </div>
        </nav>
    )
}