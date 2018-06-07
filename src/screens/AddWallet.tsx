import * as React from 'react'
import { Body, Button, Container, Content, H3, Header, Text, Title } from 'native-base'
import { s } from '../styles'
import * as Wallet from 'ethereumjs-wallet'
import * as Util from 'ethereumjs-util'
import { AsyncStorage } from 'react-native'
import QRScan from '../components/KeyQRScanner'

export interface Props {

}

export interface State {
  cameraOpen: boolean
}

export default class AddWallet extends React.Component<Props, State> {
  state: State = {
    cameraOpen: false
  }

  saveWallet = (wallet) => {
    return AsyncStorage.multiSet([
      ['wallet_private_key', wallet.getPrivateKey()],
      ['wallet_address', wallet.getAddress()]
    ])
  }

  generateWallet = () => {
    const wallet = Wallet.generate()

    this.saveWallet(wallet).then(() => {
      this.nextPage()
    })
  }

  importWallet = () => {
    this.setState({
      cameraOpen: true
    })
  }

  handleCameraDone = (status, data?) => {
    if (status === 'success') {
      this.setState({
        cameraOpen: false
      })

      const wallet = Wallet.fromPrivateKey(Util.toBuffer(data))

      this.saveWallet(wallet).then(() => {
        this.nextPage()
      })
    }
  }

  nextPage = () => {
    // TODO next page
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

          { this.state.cameraOpen && <QRScan onDone={ this.handleCameraDone } scanFor='private' /> }

          <Button block style={ [s.ma2] } onPress={ this.generateWallet }>
            <Text>Generate a new wallet</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}