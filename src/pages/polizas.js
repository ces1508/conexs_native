import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPolizas, getMorePolizas, handleRefreshing } from '../actions/polizas/creators'
import { getProfile } from '../actions/profile/creators'
import { saveItem, getItem } from '../utils/storage'
import { setToken } from '../actions/login'
import InfiniteScroll from '../components/infiniteScroll'
import Poliza from '../components/poliza'

const mapStateToProps = state => ({ ...state.polizas, token: state.login.token })
const mapDispatchToProps = {
  getPolizas,
  setToken,
  getProfile,
  getMorePolizas,
  handleRefreshing
}

class PolizasScreen extends Component {
  constructor (props) {
    super(props)
    this.getProfile = this.getProfile.bind(this)
    this.getPolizas = this.getPolizas.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.getMorePolizas = this.getMorePolizas.bind(this)
  }
  async componentDidMount () {
    await this.setToken()
    this.getProfile()
    this.getPolizas()
  }

  async setToken () {
    let token = await getItem('@user')
    if (!token.hasOwnProperty('error') && this.props.token === null) {
      this.props.setToken(token.item)
    }
  }

  async getProfile () {
    let token = await getItem('@user')
    this.props.getProfile(token)
  }

  async getPolizas () {
    let { token } = this.props
    await saveItem('@user', token)
    return this.props.getPolizas(token)
  }
  handleRefresh () {
    let { token } = this.props
    this.props.handleRefreshing(token)
  }
  getMorePolizas () {
    let { token, skip, limit } = this.props
    this.props.getMorePolizas(token, skip + limit)
  }

  render () {
    let { polizas, skip, limit, loadingMore, onFetching, onRefreshing } = this.props
    return (
      <InfiniteScroll
        height={1}
        skip={skip}
        limit={limit}
        loadingMore={loadingMore}
        onFetching={onFetching}
        keyExtractor={(item) => item.poliza}
        getData={this.getPolizas}
        getMoreData={this.getMorePolizas}
        onRefreshing={onRefreshing}
        handleRefresh={this.handleRefresh}
        data={polizas}
        renderItem={({ item }) => <Poliza {...item} navigation={this.props.navigation} />}
      />
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PolizasScreen)
