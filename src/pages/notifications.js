import React, { Component } from 'react'
import {
  View
} from 'react-native'
import { connect } from 'react-redux'
import Datasurce from '../api'
import NotificationItem from '../components/notification'
import List from '../components/list'

const mapStateToProps = state => ({ token: state.login.token })

class NotificationsList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      onFetching: false
    }
  }
  async componentDidMount () {
    let { token } = this.props
    this.setState({ onFetching: true })
    let { data } = await Datasurce.notifications(token, 0)
    this.setState({ data: data.notifications, onFetching: false })
  }
  render () {
    return (
      <View style={{ flex: 1 }}>
        <List
          {...this.state}
          renderItem={({ item }) => <NotificationItem notification={item} navigation={this.props.navigation} />}
        />
      </View>
    )
  }
}

export default connect(mapStateToProps)(NotificationsList)
