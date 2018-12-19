import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'

import PropTypes from 'prop-types'
import {isEmpty, deburr} from 'lodash'
import keycode from 'keycode'
import Downshift from 'downshift'
import Grid from '@material-ui/core/Grid'
import Popper from '@material-ui/core/Popper'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import {fade} from '@material-ui/core/styles/colorManipulator'

import {submitSearch} from 'features/entitySearch/entitySearchActions'

class Autosuggest extends Component {
  handleChange(value) {
    if (!isEmpty(value) && value !== this.props.q) {
      this.props.dispatch(submitSearch({q: value}))
    }
    return true
  }

  handleSubmit(event) {
    event.preventDefault()
    const q = document.getElementById('autosuggest-input').value
    this.props.dispatch(submitSearch({q}))
    this.props.history.push({pathname: '/search'})
  }

  renderSuggestion({suggestion, index, itemProps, highlightedIndex, selectedItem}) {
    const label = suggestion._source.labels[0]
    const {_id} = suggestion
    const isHighlighted = highlightedIndex === index
    const isSelected = (selectedItem || '').indexOf(_id) > -1
    return (
      <MenuItem
        {...itemProps}
        key={_id}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        <div style={{textOverflow: 'ellipsis', overflow: 'hidden'}}>{label}</div>
      </MenuItem>
  	)
  }

  renderInput({classes, inputProps}) {
    return (
      <InputBase
        classes={classes}
        inputProps={inputProps}
      />
    )
  }

  onSelect(selectedItem) {
    this.props.history.push({pathname: `/wiki/${selectedItem}`})
  }

  render() {
    const {suggestions, classes} = this.props

    const renderSuggestion = this.renderSuggestion
    const renderInput = this.renderInput
    const onSelect = this.onSelect.bind(this)
    const handleSubmit = this.handleSubmit.bind(this)

    return (
      <Downshift id="autosuggest" onSelect={onSelect}>
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem
        }) => (
          <div className={classes.search}>
            <div style={{display: 'flex'}}>
              <form onSubmit={handleSubmit}>
                <div style={{cursor: 'text', display: 'inline-flex', alignItems: 'center'}}>
                  { renderInput({
                    classes: {root: classes.inputRoot, input: classes.inputInput},
                    inputProps: getInputProps({placeholder: 'Search...'})
                  })
                  }
                  <SearchIcon onClick={handleSubmit} classes={{root: classes.searchIcon}}/>
                </div>
              </form>
            </div>
            <div {...getMenuProps()} style={{width: '100%'}}>
              { isOpen ? (
                <Paper square className={classes.suggestBox}>
                  { this.handleChange(inputValue) && suggestions.map((suggestion, index) => {
                    return renderSuggestion({
                      		suggestion,
                      index,
                      itemProps: getItemProps({item: suggestion._id}),
                      highlightedIndex,
                      selectedItem
											 })
                  })}
                </Paper>) : null }
            </div>
          </div>
        )}
      </Downshift>
    )
  }
}

const mapStateToProps = ({entitySearch}) => {
  const {q} = entitySearch
  const suggestions = entitySearch.results.hits || []
  return {suggestions, q}
}

export default connect(mapStateToProps)(Autosuggest)
