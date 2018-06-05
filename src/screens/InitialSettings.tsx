import * as React from 'react'
import { Body, Button, Container, Content, Form, Header, Input, Item, Label, Text, Title } from 'native-base'
import { View } from 'react-native'
import { s } from '../styles'

export default class InitialSettings extends React.Component {
  state = {
    mqtt: '',
    channelManager: '',
    gotToken: '',
    notToken: '',
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
    console.log(this.state)
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
            <Item floatingLabel>
              <Label>MQTT Server</Label>
              <Input value={ this.state.mqtt } onChangeText={ this.changeField('mqtt') } />
            </Item>

            <View style={ [s.mt4] } />

            <Item floatingLabel>
              <Label>Channel Manager address</Label>
              <Input value={ this.state.channelManager } onChangeText={ this.changeField('channelManager') } />
            </Item>

            <Item floatingLabel>
              <Label>GOT Token address</Label>
              <Input value={ this.state.gotToken } onChangeText={ this.changeField('gotToken') } />
            </Item>

            <Item floatingLabel>
              <Label>NOT Token address</Label>
              <Input value={ this.state.notToken } onChangeText={ this.changeField('notToken') } />
            </Item>

            <View style={ [s.mt4] } />

            <Button block style={ [s.ma2] } onPress={ this.submitForm }>
              <Text>Next step</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}