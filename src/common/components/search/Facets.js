import React, {Component} from "react";

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
   
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 3,
    marginBottom: '20px' 
  }, 
  paper: { 
    color: theme.palette.text.secondary, 
   },
 
  gridItem: {
    padding: theme.spacing.unit * 2,
    width: '100%',  
    marginLeft: '0', 
  },  
  filterTitle: { 
    textTransform: 'uppercase', 
    color: theme.palette.secondary.dark 
  },
  filtersTitle: {
    backgroundColor: theme.palette.dark.light,
    color: '#fff',
    textTransform: 'uppercase' 
  },
  filter: { 
    padding: '0' 
   },
  filterItem: {
    padding: '0',
    textTransform: 'capitalize'
  }
});

const Facets = ({classes, facets, selected, handleFacetToggle}) => (
   <Grid container alignItems="flex-start" direction="column" justify="flex-start" spacing={16}>
      <Grid item className={classes.gridItem} > 
        <Paper className={classes.filtersTitle} >
          <Typography variant='h6' color='inherit' >Filters</Typography>
        </Paper>
      </Grid>
    { Object.keys(facets).map((facet, i) => (
        <Facet
          key={i.toString()}
          classes={classes} 
          name={facet} 
          handleFacetToggle={handleFacetToggle}
          values={facets[facet].buckets}
          selected={selected[facet] || new Set() } />   
      ))
    }
  </Grid>
);

class Facet extends Component {
  
  handleToggle = value => () => {
    const {selected, name, handleFacetToggle } = this.props;
    if ( !selected.delete(value) ) {
      selected.add(value); 
    } 
    handleFacetToggle(name, selected);
  }
  
  render() {
    const { selected, classes, name, values  } = this.props; 
    return (
      <Grid item className={classes.gridItem}> 
        <Paper  color='#fff' >
          <Typography variant='subtitle1' className={classes.filterTitle} >{name.replace('_', ' ')}</Typography>
           <List className={classes.filter}>
            { values.map( (value,i) => ( 
               <ListItem classes={{ root: classes.filterItem}} key={value.key} role={undefined}  button onClick={this.handleToggle(value.key)}>   
                <Checkbox
                          checked={selected.has(value.key)}
                          tabIndex={-1}
                          disableRipple
                  />    
                  <ListItemText primary={`${value.key} (${value.doc_count})`} /> 
              </ListItem>
            ))}
           </List>
        </Paper>
      </Grid>
    )
  }
}

export default withStyles(styles)(Facets);
