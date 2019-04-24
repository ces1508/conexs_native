import React, { PureComponent } from 'react'

function listWithInfiniteScroll (WrappenrComponent) {
  return class extends PureComponent {
    constructor (props) {
      super(props)
      this.token = this.props.token
      this._handleRefresh = this._handleRefresh.bind(this)
      this._handlePagination = this._handlePagination.bind(this)
    }
    componentDidMount () {
      this.props.getData(this.props.token, this.props.filters)
    }
    _handleRefresh () {
      this.props.handleRefresh(this.props.token, this.props.filters)
    }
    _handlePagination () {
      let { token, skip, limit, isLastPage, loadingMore, filters } = this.props
      if (!isLastPage) {
        if (!loadingMore) {
          this.props.handlePagination(token, skip + limit, filters)
        }
      }
    }
    componentWillReceiveProps (nextProps) {
      if (nextProps.filters.applyFilters !== this.props.filters.applyFilters) {
        this.props.getData(this.props.token, nextProps.filters)
      }
    }
    render () {
      return (
        <WrappenrComponent
          {...this.props}
          extraData={this.props}
          onRefresh={this._handleRefresh}
          onEndReachedThreshold={0.5}
          onEndReached={this._handlePagination} />
      )
    }
  }
}

export default listWithInfiniteScroll
