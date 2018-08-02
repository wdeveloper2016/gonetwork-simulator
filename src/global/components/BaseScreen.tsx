import * as React from 'react'
import { View, StatusBar } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { Colors } from '../constants'

export interface BaseScreenProps {
  navigation: any,
  resetAnimatables: any
  animatables: any
}

class BaseScreen<P, S> extends React.Component<P & BaseScreenProps, S> {
  static navigationOptions = {
    gesturesEnabled: false
  }

  willFocusNavListener: any
  didFocusNavListener: any
  _isMounted: boolean = false

  componentWillMount () {
    this.willFocusNavListener = this.props.navigation.addListener('willFocus', () => {
      this.screenWillBecomeActive()
      StatusBar.setBarStyle(this.hasLightStatusBar() ? 'light-content' : 'dark-content')
    })
    this.didFocusNavListener = this.props.navigation.addListener('didFocus', () => {
      this.screenDidBecomeActive()
    })
    this._isMounted = true // eslint-disable-line
  }

  componentWillUnmount () {
    this.props.resetAnimatables(this.getScreenName())
    this._isMounted = false // eslint-disable-line
    this.willFocusNavListener.remove()
    this.didFocusNavListener.remove()
  }

  getScreenName () {
    return ''
  }

  setTimeout (func, delay) {
    setTimeout(() => {
      if (this._isMounted) { // eslint-disable-line
        func()
      }
    }, delay)
  }

  hasLightStatusBar () {
    return true
  }

  canGoBack () {
    return true
  }

  screenWillBecomeActive () {
    //
  }

  screenDidBecomeActive () {
    //
  }

  screenWillBecomeInactive () {
    return 0
  }

  navigateToScreen (toScreen, passPropNames = [], props = {}) {
    const { animatables } = this.props
    const passAnimatables: any = {}
    passPropNames.forEach((propName) => {
      const animatable = animatables[propName]
      if (animatable) {
        passAnimatables[propName] = {}
        Object.keys(animatable).forEach((key) => {
          passAnimatables[propName][key] = {
            value: animatable[key].value
          }
        })
      }
    })
    const delay = this.screenWillBecomeInactive()
    if (delay) {
      setTimeout(() => {
        this.props.navigation.navigate(toScreen, {
          animatables: passAnimatables,
          fromScreen: this.getScreenName(),
          ...props
        })
      }, delay)
    } else {
      this.props.navigation.navigate(toScreen, {
        animatables: passAnimatables,
        fromScreen: this.getScreenName(),
        ...props
      })
    }
  }

  goBack () {
    this._isMounted = false // eslint-disable-line
    const delay = this.screenWillBecomeInactive()
    if (delay) {
      setTimeout(() => {
        this.props.navigation.dispatch(NavigationActions.back())
      }, delay)
    } else {
      this.props.navigation.dispatch(NavigationActions.back())
    }
  }

  renderNavBar () {
    return false
  }

  renderContent (): any {
    return
  }

  renderAdditional () {
    return false
  }

  render () {
    const containerStyle = {
      flex: 1,
      backgroundColor: Colors.primary // No Colors.background
    }

    return (
      <View style={containerStyle}>
        <StatusBar
          barStyle={this.hasLightStatusBar() ? 'light-content' : 'dark-content'}
        />
        {this.renderNavBar()}
        {this.renderContent()}
        {this.renderAdditional()}
      </View>
    )
  }
}

export default BaseScreen
