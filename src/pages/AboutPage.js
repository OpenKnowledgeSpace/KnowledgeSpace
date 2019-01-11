import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import {withStyles} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';

import hbp from 'imgs/hbp-logo.png';
import nif from 'imgs/nif-logo.png';
import incf from 'imgs/incf-logo.svg';

import Autosuggest from 'features/autosuggest/Autosuggest';

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
    marginTop: '25px' 
   },
  logo: {
    maxWidth: '90%'
  },
  card: { minWidth: 175, maxWidth: '50%', margin: 'auto' }
})

class AboutPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes} = this.props
    return (
      <Grid container direction="column" justify="flex-start" alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h2" gutterBottom>About Us</Typography>
          <Typography variant="body1" align='justify' gutterBottom>
            KnowledgeSpace (KS) is a community encyclopaedia that links brain research concepts with data, models and literature from around the world. It is an open project and welcomes participation and contributions from members of the global research community. KS is the result of recommendations from a community workshop held by the INCF Program on Ontologies of Neural Structures in 2012 and include the report attached below to community workshop. 2012 INCF Workshop Report 
          </Typography>
          <br/>
          <Typography variant="body1" align='justify' gutterBottom>
            KnowledgeSpace is currently being developed with support from the HBP Neuroinformatics Platform funded from the European Union’s Horizon 2020 Framework Programme for Research and Innovation under the Specific Grant Agreement No. 785907 (Human Brain Project SGA2), INCF, and Neuroscience Information Frameworkj (NIF). Earlier development was supported by the HBP Neuroinformatics Platform funded from the European Union’s Horizon 2020 Framework Programme for Research and Innovation under the Specific Grant Agreement No. 720270 and No. 604102 (Human Brain Project SGA1), INCF, NIF, and the Blue Brain Project.	
          </Typography>
          <br/>
          <Typography variant="body1" align='justify' gutterBottom>
            KS builds on a vocabulary service, populated with an integrated set of neuroscience ontologies with initial content coming from the Neuroscience Lexicon (NeuroLex), and the Brain Architecture Management System (BAMS). It links to an expanding set of data sources through the NIF federated search infrastructure. 
          </Typography>
        </Grid>
        <Grid item xs={6} classes={{item: classes.logoContainer}}>
          <Grid container direction="row" alignItems='center' justify="flex-start">
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>Partners</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems='center' justify="flex-start">
            <Grid item xs={4}>
              <a target="_blank" href='https://humanbrainproject.eu/'>
                <img alt='HBP' className={classes.logo} src={hbp}  />
              </a>
            </Grid>
            <Grid item xs={4}>
              <a target="_blank" href='https://www.neuinfo.org'>
                <img alt='NIF' className={classes.logo} src={nif}  />
              </a>
            </Grid>
            <Grid item xs={4}>
              <a target="_blank" href='https://www.incf.org'> 
                <img alt='INCF' className={classes.logo} src={incf}  />
              </a>
            </Grid>
          </Grid>
          <Grid item classes={{item: classes.logoContainer}} xs={12}>
            <Typography variant="h4" gutterBottom>Contact Us</Typography>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6">
                  Hosted By: <a href='https://www.incf.org'>INCF</a>
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Karolinska Institutet<br/> 
                  Nobels väg 15 A SE-171 77<br/> 
                  Stockholm Sweden<br/>
                  <a href="mailto:knowledgespace@incf.org">knowledgespace@incf.org</a>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item classes={{item: classes.logoContainer}} xs={4}>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({entitySearch}) => {
  return {...entitySearch}
}

export default withStyles(styles)(AboutPage)
