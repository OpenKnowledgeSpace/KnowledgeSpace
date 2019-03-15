import React, {Component} from 'react'
import DataSpaceSearch from 'features/dataSpace/DataSpaceSearch'

const DataSpacePage = props => {
  const {slug, category, source} = props.match.params
  return (<DataSpaceSearch slug={slug} source={source} dataSpace={{}}/>)
}

export default DataSpacePage
