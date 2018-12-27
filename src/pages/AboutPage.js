import React, {Component} from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import {fade} from '@material-ui/core/styles/colorManipulator'

import Autosuggest from 'features/autosuggest/Autosuggest'

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
  }
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
          <Typography variant="body2" align='justify' gutterBottom>
            KnowledgeSpace (KS) is a community encyclopaedia that links brain research concepts with data, models and literature from around the world. It is an open project and welcomes participation and contributions from members of the global research community. KS is the result of recommendations from a community workshop held by the INCF Program on Ontologies of Neural Structures in 2012 and include the report attached below to community workshop. 2012 INCF Workshop Report 
            KnowledgeSpace is currently being developed with support from the HBP Neuroinformatics Platform funded from the European Union’s Horizon 2020 Framework Programme for Research and Innovation under the Specific Grant Agreement No. 785907 (Human Brain Project SGA2), INCF, and Neuroscience Information Frameworkj (NIF). Earlier development was supported by the HBP Neuroinformatics Platform funded from the European Union’s Horizon 2020 Framework Programme for Research and Innovation under the Specific Grant Agreement No. 720270 and No. 604102 (Human Brain Project SGA1), INCF, NIF, and the Blue Brain Project.	
            KS builds on a vocabulary service, populated with an integrated set of neuroscience ontologies with initial content coming from the Neuroscience Lexicon (NeuroLex), and the Brain Architecture Management System (BAMS). It links to an expanding set of data sources through the NIF federated search infrastructure. 
          </Typography>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({entitySearch}) => {
  return {...entitySearch}
}

export default withStyles(styles)(AboutPage)
