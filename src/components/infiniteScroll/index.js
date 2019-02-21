import React, { Component } from 'react'
import List from '../list'

export default class InfinteScroll extends Component {
  render () {
    return (
      <List
        onEndReached={this.props.getMoreData}
        {...this.props}
        onEndReachedThreshold={0.5}
        loadingMore={this.props.loadingMore}
        onRefresh={this.props.handleRefresh}
        refreshing={this.props.onRefreshing}
      />
    )
  }
}
