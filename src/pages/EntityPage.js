import React, {Component} from 'react'
import md5 from 'crypto-js/md5';

import Entity from 'features/entity/Entity'

const EntityPage = props => {
  const { category, slug } = props.match.params;
  
  const hash = md5(category + '/' + slug).toString();
  return (
    <Entity hash={hash}/>
  )
}

export default EntityPage
