import React, {Component} from 'react'

import Entity from 'features/entity/Entity'

const EntityPage = props => {
  const { slug } = props.match.params;
  
  return (
    <Entity slug={slug}/>
  )
}

export default EntityPage
