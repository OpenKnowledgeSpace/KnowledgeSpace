import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

import hbp from "imgs/hbp-logo.png";
import nif from "imgs/nif-logo.png";
import incf from "imgs/incf-logo.svg";

import Autosuggest from "features/autosuggest/Autosuggest";

const styles = (theme) => ({
  inputRoot: {},
  inputInput: {
    fontSize: theme.typography.h5.fontSize,
    paddingLeft: "10px",
  },
  searchContainer: {
    marginTop: "20px",
  },
  searchIcon: {
    fontSize: theme.typography.h4.fontSize,
    width: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  suggestBox: {
    zIndex: 1,
    marginTop: theme.spacing.unit,
    zIndex: 1,
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    "&:hover": {
      boxShadow: theme.shadows[5],
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "100%",
  },
  logoContainer: {
    marginTop: "25px",
  },
  logo: {
    maxWidth: "90%",
  },
  card: {
    minWidth: 175,
    maxWidth: "80%",
    margin: "auto",
  },
  button: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
});

class AboutPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h2" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            KnowledgeSpace aims to be a globally-used, community-based,
            data-driven encyclopedia for neuroscience that links brain research
            concepts to data, models, and the literature that support them.
            Further it aims to serve as a framework where large-scale
            neuroscience projects can expose their data to the neuroscience
            community-at-large. KnowledgeSpace is a framework that combines
            general descriptions of neuroscience concepts found in wikipedia
            with more detailed content from NeuroLex. It then integrates the
            content from those two sources with the latest neuroscience
            citations found in PubMed and data found in some of the world’s
            leading neuroscience repositories. KnowledgeSpace is a joint
            development between the Human Brain Project (HBP), the International
            Neuroinformatics Coordinating Facility (INCF), and the Neuroscience
            Information Framework (NIF).
          </Typography>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            KnowledgeSpace is currently being developed with funding from the
            European Union's Horizon 2020 Framework Programme for Research and
            Innovation under the Specific Grant Agreement No. 945539 (Human
            Brain Project SGA3), INCF, and Neuroscience Information Framework
            (NIF). Earlier development was supported by the European Union's
            Horizon 2020 Framework Programme for Research and Innovation under
            the Framework Partnership Agreement No. 650003 (HBP FPA), INCF, NIF,
            and the Blue Brain Project.
          </Typography>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            KS builds on a vocabulary service, populated with an integrated set
            of neuroscience ontologies with initial content coming from the
            Neuroscience Lexicon (NeuroLex), and the Brain Architecture
            Management System (BAMS). It links to an expanding set of data
            sources through the NIF federated search infrastructure.
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            <Button
              // rel='noopener'
              // target="_blank"
              color="primary"
              className={classes.button}
              onClick={() => this.props.history.push("/documentation")}
              // href='https://docs.google.com/document/d/1cNtiwtt5uu1EjguNxU9y1FiizDi2_XRXUMZq3G8yB-Y/edit'
            >
              How To Documentation
            </Button>
            <Button
              rel="noopener"
              target="_blank"
              color="secondary"
              className={classes.button}
              href="https://github.com/OpenKnowledgeSpace/KnowledgeSpace"
            >
              Technical Documentation
            </Button>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} classes={{ item: classes.logoContainer }}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-start"
          >
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Partners
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-start"
          >
            <Grid item xs={4}>
              <a target="_blank" href="https://humanbrainproject.eu/">
                <img alt="HBP" className={classes.logo} src={hbp} />
              </a>
            </Grid>
            <Grid item xs={4}>
              <a target="_blank" href="https://www.neuinfo.org">
                <img alt="NIF" className={classes.logo} src={nif} />
              </a>
            </Grid>
            <Grid item xs={4}>
              <a target="_blank" href="https://www.incf.org">
                <img alt="INCF" className={classes.logo} src={incf} />
              </a>
            </Grid>
          </Grid>
          <Grid item classes={{ item: classes.logoContainer }} xs={12}>
            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6">
                  Hosted By: <a href="https://www.incf.org">INCF</a>
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Karolinska Institutet
                  <br />
                  Nobels väg 15 A SE-171 77
                  <br />
                  Stockholm Sweden
                  <br />
                  <a href="mailto:knowledgespace@incf.org">
                    knowledgespace@incf.org
                  </a>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item classes={{ item: classes.logoContainer }} xs={12}></Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AboutPage);
