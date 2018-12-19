import React, {Component} from 'react'
import LiteratureSearch from 'features/literature/LiteratureSearch'

const LiteraturePage = props => {
  const {curie} = props.match.params
  return (
    <LiteratureSearch curie={curie}/>
  )
}

export default LiteraturePage
