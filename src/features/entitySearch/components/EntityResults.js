import React from "react";
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
  },
});

const EntityResults = ({hits, classes}) => (
  <div className={classes.root}>
    <Typography variant='subtitle1' className={classes.filterTitle}>{hits.total} records found</Typography>
    <Divider  />
    <List> 
      { hits.hits.map( (hit, i) => (
        <Result result={hit._source}
                classes={classes}
                key={i.toString()} />
      ))}
    </List>
  </div>
);


const Result = ({result, classes}) => (
  <li>
    <ListItem component={Link} to={`/wiki/${result.curie}`}>
      <ListItemText primary={result.labels[0]} secondary={result.definitions[0]} />
    </ListItem>
    <Divider light />
  </li>
);

export default withStyles(styles)(EntityResults);
