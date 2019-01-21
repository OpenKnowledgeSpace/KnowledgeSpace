import React, {Component} from 'react'
import DataSpaceSearch from 'features/dataSpace/DataSpaceSearch'
import md5 from 'crypto-js/md5';

const DataSpacePage = props => {
  const {slug, category, source} = props.match.params
  const hash = md5(category + '/' + slug).toString();
  return (<DataSpaceSearch hash={hash} source={source} dataSpace={{}}/>)
}

export default DataSpacePage
