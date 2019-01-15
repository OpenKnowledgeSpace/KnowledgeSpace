import React, {Component} from 'react'
import DataSpaceSearch from 'features/dataSpace/DataSpaceSearch'

const DataSpacePage = props => {
  const {curie, source} = props.match.params
  return (<DataSpaceSearch curie={curie} source={source} dataSpace={{}}/>)
}

export default DataSpacePage
