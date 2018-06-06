import * as React from 'react'
import { Body, Button, Container, Content, H2, H3, Header, Text, Title } from 'native-base'
import { s } from '../styles'
import * as Wallet from 'ethereumjs-wallet'
import { AsyncStorage } from 'react-native'

export interface Props {

}

export interface State {

}

export default class AddWallet extends React.Component<Props, State> {
  generateWallet = () => {
    const wallet = Wallet.generate()

    AsyncStorage.multiSet([
      ['wallet_private_key', wallet.getPrivateKey()],
      ['wallet_address', wallet.getAddress()]
    ]).then(() => {
      // TODO main screen?
    })
  }

  importWallet = () => {
    // TODO camera
  }

  render () {
    return (
      <Container>
        <Header>
          <Body>
          <Title>Import wallet</Title>
          </Body>
        </Header>

        <Content>
          <H3 style={ [s.tc, s.mv3] }>To use this app you need an Ethereum wallet</H3>

          <Button block style={ [s.ma2] } onPress={ this.importWallet }>
            <Text>Import using camera</Text>
          </Button>

          <Button block style={ [s.ma2] } onPress={ this.generateWallet }>
            <Text>Generate a new wallet</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}