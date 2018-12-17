import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import classnames from 'classnames';


import { updateCurie } from './entityActions';
import { isArray, keys  } from 'lodash';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Fab from '@material-ui/core/Fab';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';


import Detail from './components/Detail';
import DataSpaceAggs from '../dataSpaceAggs/DataSpaceAggs';
import Literature from '../literature/Literature';

const styles = theme => ({
  titleRoot: { 
    padding: 0 
  },
  title: {
    ...theme.typography.h3 
  },
  cardContent: {
    paddingLeft: 0, 
    paddingBottom: 0
  }, 
  description: {
    padding: '25px 25px 25px 50px',
    overflow: 'hidden',
    textAlign: 'justify' 
  },
  descriptionText: {
    fontSize: theme.typography.pxToRem(theme.typography.fontSize * 2),
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
    margin: theme.spacing.unit,
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  actions: {
    textAlign: 'center',
    display: 'block',
    paddingTop: 0
  }
});


class Entity extends Component {
  
  state = { expanded: false };
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  
  componentDidMount() {
    const {curie} = this.props; 
    this.props.dispatch(updateCurie(curie));
  }
  
  render() {
    const {entity, curie, classes} = this.props; 
    const {tree} = entity; 
    const label = entity.labels ? entity.labels[0] : ''; 
    const definitions = entity.definitions ? entity.definitions : '';

    return (
      <Grid container direction='row' justify='flex-start' alignItems='flex-start' spacing={16}>
        <Grid item xs={12} sm={8}> 
          <Grid container direction='column' justify='flex-start' alignItems='flex-start' spacing={16}>
            <Grid item> 
              <Card classes={{ root: classes.description}}> 
                <CardHeader title={label} classes={{root: classes.titleRoot, title: classes.title }} />        
                <Divider />                
                <CardContent classes={{root: classes.cardContent}}>
                 <Typography paragraph={true} classes={{root: classes.descriptionText}} >
                  {definitions} 
                 </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <Fab color="primary"
                      onClick={this.handleExpandClick}
                     className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state.expanded,
                      })}
                      aria-expanded={this.state.expanded}
                      aria-label="Show more">
                    <ExpandMoreIcon />
                  </Fab>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <CardContent classes={{root: classes.cardContent}}>
                    {JSON.stringify(tree)}
                  </CardContent>
                </Collapse>
              </Card>
 			      </Grid>         
            <Grid item >
              <Card>
                <Literature />    
              </Card>
            </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4}>
          <Grid item> 
            <DataSpaceAggs />
          </Grid> 
      </Grid>
    </Grid>
    ); 
  }

}

const mapStateToProps = ({entity}, ownProps) => {
  const {curie} = ownProps; 
  return {entity,curie}
}

export default withStyles(styles)(connect(mapStateToProps)(Entity));
