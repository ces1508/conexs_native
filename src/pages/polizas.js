import { connect } from 'react-redux'
import {
  getPolizas as getData,
  getMorePolizas as handlePagination,
  handleRefreshing as handleRefresh } from '../actions/polizas/creators'
import listWhitInfiniteScroll from '../components/infiniteScroll'
import Polizas from '../components/polizasList'

const mapStateToProps = state => ({
  ...state.polizas,
  token: state.login.token,
  filters: state.filters
})
const mapDispatchToProps = {
  getData,
  handlePagination,
  handleRefresh
}

const InfiniteScroll = listWhitInfiniteScroll(Polizas)
export default connect(mapStateToProps, mapDispatchToProps)(InfiniteScroll)
