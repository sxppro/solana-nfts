import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import { Flex, Button } from '@chakra-ui/react';

// Constants
const TWITTER_HANDLE = 'Sopproo';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkWalletExistence = async () => {
    try {
      const { solana } = window;
      if (solana) {
        console.log(`Solana :: Success`);
        if (solana.isPhantom) {
          console.log(`Solana :: Phantom wallet detected`);

          // Establish connection

          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(`Phantom PK :: ${response.publicKey.toString()}`);
          setWalletAddress(response.publicKey.toString());
        } else {
          console.log(`Solana :: Not detected`);
          // window.open("https://phantom.app/", "_blank");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => {
    return (
      <Flex p={4} flexDirection="column" alignItems="center">
        <Button
          bgGradient="linear(to-l, #ff8867, #ff52ff))"
          onClick={connectWallet}
        >
          Connect Wallet
        </Button>
      </Flex>
    );
  };

  /*
   * Check for wallet when component mounts
   */
  useEffect(() => {
    const onLoad = async () => {
      await checkWalletExistence();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
