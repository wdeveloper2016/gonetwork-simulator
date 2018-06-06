import * as React from 'react'
import { Body, Button, Container, Content, Form, Header, Input, Item, Label, Text, Title } from 'native-base'
import { AsyncStorage, View } from 'react-native'
import { s, c } from '../styles'
import * as Util from 'ethereumjs-util'
import FormInput from '../components/FormInput'

export interface Props {

}

export interface ErrorState {
  mqtt?: boolean | string,
  channelManager?: boolean | string,
  gotToken?: boolean | string,
  notToken?: boolean | string,
}

export interface State {
  mqtt: string,
  channelManager: string,
  gotToken: string,
  notToken: string,

  submitting: boolean,

  errors: ErrorState
}

export default class InitialSettings extends React.Component<Props, State> {
  state: State = {
    mqtt: '',
    channelManager: '',
    gotToken: '',
    notToken: '',

    submitting: false,

    errors: {}
  }

  changeField = (field) => (value) => {
    this.setState({
      [field]: value,
      errors: {
        ...this.state.errors,
        [field]: false
      }
    })
  }

  submitForm = () => {
    if (this.state.submitting) {
      return
    }

    this.setState({
      submitting: true,
      errors: {}
    })

    const mqtt = this.state.mqtt.trim()
    const channelManager = this.state.channelManager.trim()
    const gotToken = this.state.gotToken.trim()
    const notToken = this.state.notToken.trim()

    let errors: ErrorState = {}

    if (!mqtt) {
      errors.mqtt = 'MQTT Server is required'
    }

    if (!channelManager) {
      errors.channelManager = 'Channel Manager address is required'
    } else if (!Util.isValidAddress(channelManager)) {
      errors.channelManager = 'This is not a valid Ethereum address'
    }

    if (!gotToken) {
      errors.gotToken = 'GOT Token address is required'
    } else if (!Util.isValidAddress(gotToken)) {
      errors.gotToken = 'This is not a valid Ethereum address'
    }

    if (!notToken) {
      errors.notToken = 'NOT Token address is required'
    } else if (!Util.isValidAddress(notToken)) {
      errors.notToken = 'This is not a valid Ethereum address'
    }

    if (Object.keys(errors).length > 0) {
      this.setState({
        submitting: false,
        errors
      })
      return
    }

    AsyncStorage.multiSet([
      ['mqtt_server', mqtt],
      ['channel_manager_address', channelManager],
      ['got_address', gotToken],
      ['not_address', notToken]
    ]).then(() => {
      this.nextPage()
    })
  }

  nextPage = () => {
    // TODO next page
  }

  render () {
    return (
      <Container>
        <Header>
          <Body>
          <Title>GoNetwork Demo App</Title>
          </Body>
        </Header>

        <Content>
          <Form>
            <FormInput value={ this.state.mqtt }
                       label='MQTT Server *'
                       error={ this.state.errors.mqtt }
                       autoCapitalize='none'
                       onChange={ this.changeField('mqtt') } />

            <View style={ [s.mt4] } />

            <FormInput value={ this.state.channelManager }
                       label='Channel Manager address *'
                       error={ this.state.errors.channelManager }
                       autoCapitalize='none'
                       onChange={ this.changeField('channelManager') } />

            <FormInput value={ this.state.gotToken }
                       label='GOT Token address *'
                       error={ this.state.errors.gotToken }
                       autoCapitalize='none'
                       onChange={ this.changeField('gotToken') } />

            <FormInput value={ this.state.notToken }
                       label='NOT Token address *'
                       error={ this.state.errors.notToken }
                       autoCapitalize='none'
                       onChange={ this.changeField('notToken') } />

            <View style={ [s.mt4] } />

            <Button block style={ [s.ma2] } onPress={ this.submitForm } disabled={ this.state.submitting }>
              <Text>Next step</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}
