import * as React from 'react'
import { c, s } from '../styles'
import { Input, Item, Label, NativeBase, Text } from 'native-base'

export interface Props extends NativeBase.Input {
  label: string,
  value: string,
  error?: any,
  onChange: (value) => void
}

export default (props: Props) => {
  const { label, value, error, onChange, ...p } = props

  return (
    <React.Fragment>
      <Item floatingLabel error={ !!error }>
        <Label>{ label }</Label>
        <Input value={ value } onChangeText={ onChange } { ...p } />
      </Item>
      { !!error && <Text style={ [s.mh3, s.f6, { color: c.danger }] }>{ error }</Text> }
    </React.Fragment>
  )
}