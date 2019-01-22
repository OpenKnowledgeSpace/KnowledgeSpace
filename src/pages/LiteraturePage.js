import React, {Component} from 'react'
import LiteratureSearch from 'features/literature/LiteratureSearch'
import md5 from 'crypto-js/md5';

const LiteraturePage = props => {
  const {slug, category, source} = props.match.params
  const hash = md5(category + '/' + slug).toString();
  return (
    <LiteratureSearch hash={hash}/>
  )
}

export default LiteraturePage
