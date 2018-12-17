import React, {Component} from "react";

import { Link } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

import { isArray, keys, has } from 'lodash';

const handleClick = ({target}) => {
  Array.from(target.parentElement.getElementsByTagName('a')).forEach( a => a.click() );
}

const DataSpaceCategory = ({label,sources,doc_count, entity, classes}) => {
  const {curie} = entity;

  return(
      <List
        component="div"
        classes={{root: classes.categoryList}} 
        subheader={
          <ListSubheader component='h6' classes={{root: classes.categorySubtitle}} >
            <label className={classes.categoryLabel} >{label}</label>
            <Chip  classes={{root: classes.categoryResultsFound }} color="secondary"   label={ `${doc_count} results` }></Chip>
          </ListSubheader>}
      >
        { sources.map(source => (
              <ListItem button classes={{root: classes.sourceButton}} key={source.id} disableGutters={true} onClick={handleClick} > 
                  <ListItemText classes={{primary: classes.sourceLabel}} 
                  secondary={source.description}
                  primary={
                    <React.Fragment> 
                      <Link to={`/wiki/${curie}/dataspace/${source.id}`}>
                        {`${source.label}`}
                      </Link>
                      <Typography color='textSecondary' variant='subtitle2'>{`${source.doc_count} results`}</Typography>
                    </React.Fragment>
                    } />
              </ListItem>
            ))
        } 
        <Divider classes={{root: classes.sourceDivider}} />                
      </List>
  )
};

export default DataSpaceCategory;
