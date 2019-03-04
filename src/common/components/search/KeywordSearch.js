import React, {Component} from "react";

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
  },
  textField: {
    width: '90%'
  },
});

class KeywordSearch extends Component {

  state = {
    keyword: '',
  };

  handleChange = event => {
    const {handleKeywordSearch} = this.props;
    const {value} = event.target
    this.setState({
      keyword: value,
    }, handleKeywordSearch(value));
  };

  render() {
     const { classes } = this.props;

    return(
  <Grid container alignItems="flex-start" direction="column" justify="flex-start" spacing={16}>
    <Grid item className={classes.gridItem} > 
      <Paper className={classes.filtersTitle} >
        <Typography variant='h6' color='inherit' >Search</Typography>
      </Paper>
    </Grid>
    <Grid item className={classes.gridItem} > 
      <Paper >
        <TextField
          id="outlined-name"
          label="Keyword"
          className={classes.textField}
          value={this.state.keyword}
          onChange={this.handleChange.bind(this)}
          margin="normal"
          variant="outlined"
        />
      </Paper>
    </Grid>
  </Grid>
    )
  }
};

  
export default withStyles(styles)(KeywordSearch);
