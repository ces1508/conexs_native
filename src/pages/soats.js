import PolizasList from '../components/polizasList'
import { connect } from 'react-redux'
import {
  getSoats as getData,
  getMoreSoats as handlePagination,
  handleRefresh
} from '../actions/soats/creators'
import listwithInfiniteScroll from '../components/infiniteScroll'

const mapStateToProps = state => ({ ...state.soats, token: state.login.token })
const mapsDispatchToProps = {
  getData,
  handlePagination,
  handleRefresh
}

const Soats = listwithInfiniteScroll(PolizasList)
export default connect(mapStateToProps, mapsDispatchToProps)(Soats)
