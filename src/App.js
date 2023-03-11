/* eslint-disable */ 
import { useEffect, useState } from 'react';
import { utils } from "ethers"
import axios from 'axios';
import { Container, GridItem, SimpleGrid, Button, Text, FormControl, FormLabel, Input, Alert, AlertIcon } from '@chakra-ui/react';
import './App.css';

import Nft from './Nft';

const App = () => {
  const perPage = 9;
  const [nfts, setNfts] = useState([]);
  const [showCount, setShowCount] = useState(perPage);
  const [address, setAddress] = useState('');
  const [errorMessageText, setErrorMessageText] = useState('');
  const [startToken, setStartToken] = useState('');

  /*
   * The useEffect only run when one of these [showCount, address] get change 
  */
  useEffect(() => {
    // The key based on Alchemy api
    /* And for the params, they're:
      *  ContractAddress
      *  WithMetadata
      *  StartToken
    * You can read about they do on the alchemy api
    */
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_alchemy_api_key}/getNFTsForCollection`;
    const withMetadata = true;

    // We use "utils" to see if address is invalid or empty
    if (!utils.isAddress(address) && address !== '') {
      setErrorMessageText('Invalid address');
      if (startToken.length > 0) { setStartToken('') }
      setNfts([]);
    } else {
      // Here we see if the ntfs are loaded and if not, we call the api to load it
      if ((nfts.length === 0 || nfts.length < showCount) && address !== '') {
        var config = {
          method: 'get',
          url: `${baseURL}?contractAddress=${address}&withMetadata=${withMetadata}&startToken=${startToken}`,
          headers: {}
        };
        axios(config)
          .then(response => {
            // Now here if the axios was successful then we clear the error message and then we load more nfts if there is ones or we load new to the array
            setErrorMessageText('');
            setNfts([...nfts, ...response.data.nfts]);
            // Here we capture the startToken to use in the next call
            setStartToken(response.data.nfts[response.data.nfts.length - 1].id.tokenId);
          })
          .catch(error => setErrorMessageText(error.message));
      }
    }
  }, [showCount, address]);

  return (
    <>
    {/* We use the @chakra-ui library to style the cards */}
      <Container maxWidth={1200}>
        <Text fontSize="4xl" fontWeight="bold" marginBottom="4" textAlign="center">Nft Addresses</Text>
        <FormControl marginBottom={4}>
          <FormLabel fontWeight={700} htmlFor='email'>Contract-address</FormLabel>
          <Input id='email' type='text' value={address} onChange={(val) => { setAddress(val.target.value) }} placeholder="0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d" />
        </FormControl>
        {/* Here we add an error message if the user add an invalid address */}
        {errorMessageText ?
          <Alert show={errorMessageText} status='error'>
            <AlertIcon />
            {errorMessageText}
          </Alert>
          : <></>}
        <SimpleGrid columns={[2, null, 3]} gap={6}>
          {/* Here we loop on the nfts and pass the arguments to the component "Nft" */}
          {nfts.length > 0 ? nfts.slice(0, showCount).map((nft, key) =>
            <GridItem key={key}>
              <Nft id={parseInt(nft.id.tokenId, 16)} title={nft.title}
              address={nft.contract.address} name={nft.contractMetadata.name}
              description={nft.description}
              image={nft.media[0].gateway} tokenUri={nft.tokenUri.gateway}  />
            </GridItem>
          ) : null}
        </SimpleGrid>
      </Container>
      <Container marginTop='4' centerContent>
        {/* If the nfts doesn't exist (we don't show the button) but if it does then we add click method to it and we get other new pages*/}
        {nfts.length > 0 ? <Button align='center' onClick={() => { setShowCount(showCount + perPage) }}>Load more</Button> : <></>}
      </Container>
    </>
  )
}




export default App;
