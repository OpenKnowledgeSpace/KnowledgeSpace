import React, {Component} from 'react'
import {connect} from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import {fade} from '@material-ui/core/styles/colorManipulator'

import Autosuggest from 'features/autosuggest/Autosuggest'

import hbp from 'imgs/hbp-logo.png';
import nif from 'imgs/nif-logo.png';
import incf from 'imgs/incf-logo.svg';

import brainmaps from 'imgs/brainmaps.png';
import neuromorpho from 'imgs/neuromorpho.png';
import opensourcebrain from 'imgs/opensourcebrain.png';
import icg from 'imgs/icg.png';
import logo from 'imgs/logo.png';
import pubmed from 'imgs/pubmed.png';
import neurolex from 'imgs/neurolex.png';
import modeldb from 'imgs/modeldb.png';
import gensat from 'imgs/gensat.png';
import nbd from 'imgs/nbd.png';
import neuroelectro from 'imgs/neuroelectro.png';
import bbp from 'imgs/bbp.png';
import cli from 'imgs/cli.png';
import ks6 from 'imgs/ks6.png';
import allen from 'imgs/allen.png';




const styles = theme => ({
  inputRoot: {},
  inputInput: {
    fontSize: theme.typography.h5.fontSize,
    paddingLeft: '10px'
  },
  searchContainer: {
    marginTop: '20px'
  },
  searchIcon: {
    fontSize: theme.typography.h4.fontSize,
    width: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  suggestBox: {
    zIndex: 1,
    marginTop: theme.spacing.unit,
    zIndex: 1
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    '&:hover': {
      boxShadow: theme.shadows[5],
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    width: '100%'
  },
  logoContainer: { 
    marginTop: '125px', 
    [theme.breakpoints.up('sm')]: {
      minWidth: '500px'
    }
   },
  logo: {
    margin: '25px',
  },
  partners: { marginBottom: '30px' }
})

class HomePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes} = this.props
    return (
      <Grid container direction="column" justify="space-evenly" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h2">KnowledgeSpace</Typography>
          <Typography variant="subtitle1" gutterBottom>A community encyclopedia linking brain research concepts to data, models, and literature.</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className={classes.searchContainer}>
            <Autosuggest classes={classes} history={this.props.history}/>
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
        </Grid>
        <Grid item xs={12} sm={8} classes={{item: classes.logoContainer }}>
          <Grid container direction="row" alignItems='center' justify="flex-start" classes={{container: classes.partners}}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>Over 1678580 pieces of data collected from 14 sources.</Typography> 
              <Typography variant="h4" gutterBottom>Partners</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems='center' justify="space-between">
            <Grid item sm={4} xs={12}>
              <a href='https://humanbrainproject.eu/'>
                <img alt='HBP' className={classes.logo} src={hbp}  />
              </a>
            </Grid>
            <Grid item sm={4} xs={12}>
              <a href='https://www.neuinfo.org'>
                <img alt='NIF' className={classes.logo} src={nif}  />
              </a>
            </Grid>
            <Grid item sm={4} xs={12}>
              <a href='https://www.incf.org'> 
                <img alt='INCF' className={classes.logo} src={incf}  />
              </a>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems='center' justify="space-between">
            <Grid item sm={3} xs={12}>
              <a href='http://brainmap.org/'>
                <img alt='brainmaps' className={classes.logo} src={brainmaps}  />
              </a>
            </Grid>
            <Grid item sm={3} xs={12}>
              <a href='http://neuromorpho.org/'>
                <img alt='neuromorpho' className={classes.logo} src={neuromorpho}  />
              </a>
            </Grid>
            <Grid item sm={3} xs={12}>
              <a href='http://www.opensourcebrain.org/'> 
                <img alt='opensourcebrain' className={classes.logo} src={opensourcebrain}  />
              </a>
            </Grid>
            <Grid item sm={3} xs={12}>
              <a href='https://icg.neurotheory.ox.ac.uk/'>
                <img alt='icg' className={classes.logo} src={icg}  />
              </a>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems='center' justify="space-between">
            <Grid item sm={3} xs={12}>
              <a href='https://www.ncbi.nlm.nih.gov/pubmed'>
                <img alt='pubmed' className={classes.logo} src={pubmed}  />
              </a>
            </Grid>
            <Grid item sm={3} xs={12}>
              <a href='http://neurolex.org'> 
                <img alt='neurolex' className={classes.logo} src={neurolex}  />
              </a>
            </Grid>
            <Grid item sm={3} xs={12}>
              <a href='https://senselab.med.yale.edu/ModelDB/'>
                <img alt='modeldb' className={classes.logo} src={modeldb}  />
              </a>
            </Grid>
            <Grid item sm={3} xs={12}>
              <a href='http://www.gensat.org/daily_showcase.jsp'>
                <img alt='gensat' className={classes.logo} src={gensat}  />
              </a>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems='center' justify="space-between">
            <Grid item sm={3} xs={12}>
              <a href='https://senselab.med.yale.edu/neurondb'> 
                <img alt='nbd' className={classes.logo} src={nbd}  />
              </a>
            </Grid>
            <Grid item sm={3} xs={12}>
              <a href='https://neuroelectro.org/'>
                <img alt='neuroelectro' className={classes.logo} src={neuroelectro}  />
              </a>
            </Grid>
            <Grid item sm={3} xs={12}>
              <a href='https://bluebrain.epfl.ch/'>
                <img alt='bbp' className={classes.logo} src={bbp}  />
              </a>
            </Grid>
            <Grid item sm={3} xs={12}>
              <a href='http://cellimagelibrary.org/'> 
                <img alt='cli' className={classes.logo} src={cli}  />
              </a>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems='center' justify="space-between">
            <Grid item sm={3} xs={12}>
              <a href='http://portal.brain-map.org/'>
                <img alt='allen' className={classes.logo} src={allen}  />
              </a>
            </Grid>
            <Grid item sm={3} xs={12}>
            </Grid>
            <Grid item sm={3} xs={12}>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({entitySearch}) => {
  return {...entitySearch}
}

export default withStyles(styles)(connect(mapStateToProps)(HomePage))
