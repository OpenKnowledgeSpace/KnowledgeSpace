import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Autosuggest from 'features/autosuggest/Autosuggest'

import hbp from 'imgs/hbp-logo-new.png';
import nif from 'imgs/nif-logo-new.png';
import incf from 'imgs/incf-logo.svg';

import ebrains from 'imgs/partners/ebrains.png';
import brainmaps from 'imgs/partners/brainmaps.png';
import neuromorpho from 'imgs/partners/neuromorpho.png';
import opensourcebrain from 'imgs/partners/opensourcebrain.png';
import icg from 'imgs/partners/icg.png';
import pubmed from 'imgs/partners/pubmed.png';
import neurolex from 'imgs/partners/neurolex.png';
import modeldb from 'imgs/partners/modeldb.png';
import gensat from 'imgs/partners/gensat.png';
import neurondb from 'imgs/partners/neurondb.png';
import neuroelectro from 'imgs/partners/neuroelectro.png';
import bbp from 'imgs/partners/bbp.png';
import cli from 'imgs/partners/cli.png';
import allen from 'imgs/partners/allen.png';

import banner from 'imgs/ks-banner.png';

import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

import '../styles/app.css';

import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from '@material-ui/core'

const partner_logos = [
  {
    href: 'http://portal.brain-map.org/',
    name: 'Allen Brain Map',
    src: allen
  },
  {
    href: 'http://neuromorpho.org/',
    name: 'Neuromorpho',
    src: neuromorpho,
    isSpacingRequired: true, // for large icons 
  },
  {
    href: 'https://www.ncbi.nlm.nih.gov/pubmed',
    name: 'PubMed',
    src: pubmed
  },
  {
    href: 'https://icg.neurotheory.ox.ac.uk/',
    name: 'IonChannelGenealogy',
    src: icg,
    isSpacingRequired: true, // for large icons 
  },
  {
    href: 'http://neurolex.org',
    name: 'NeuroLex',
    src: neurolex
  },
  {
    href: 'https://senselab.med.yale.edu/neurondb',
    name: 'NeuronDB',
    src: neurondb,
    isSpacingRequired: true, // for large icons 
  },
  {
    href: 'https://bluebrain.epfl.ch/',
    name: 'Blue Brain Project',
    src: bbp
  },
  {
    href: 'http://www.gensat.org/daily_showcase.jsp',
    name: 'GENSAT',
    src: gensat,
    isSpacingRequired: true, // for large icons 
  },
  {
    href: 'http://cellimagelibrary.org/',
    name: 'Cell Image Library',
    src: cli
  },
  {
    href: 'https://neuroelectro.org/',
    name: 'NeuroElectro',
    src: neuroelectro,
    isSpacingRequired: true, // for large icons 
  },
  {
    href: 'http://brainmap.org/',
    name: 'BrainMaps',
    src: brainmaps
  },
  {
    href: 'https://senselab.med.yale.edu/ModelDB/',
    name: 'ModelDB',
    src: modeldb,
    isSpacingRequired: true, // for large icons 
  },
  {
    href: 'https://ebrains.eu/',
    name: 'EBRAINS',
    src: ebrains
  },
  {
    href: 'http://www.opensourcebrain.org/',
    name: 'Open Source Brain',
    src: opensourcebrain,
    isSpacingRequired: true, // for large icons 
  },
];

// disable sort in order to maintain space between logos
// const sortLogos = (logos) => {
//   return logos.sort((c1, c2) => {
//     return c1.name.toLowerCase() > c2.name.toLowerCase() ? 1 : -1;
//   });
// }
// const logos = sortLogos(partner_logos);

const logos = partner_logos;


const styles = theme => ({
  homeWrapper: {
    marginTop: '-40px', // adjust main div padding on home page
    marginLeft: '-20px',
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      fontSize: theme.typography.h4.fontSize,
    },
  },
  inputRoot: { paddingRight: '10px', width: '100%' },
  inputInput: {
    fontSize: theme.typography.h5.fontSize,

  },
  SearchInput: {
    padding: '5px 10px',
    border: '2px solid #ccc',
    borderRadius: '8px'
  },
  searchAreaWrapper: {
    // marginTop: '30px',
  },
  searchContainer: {
    // margin: '20px 0'
    // paddingTop: '20px',
    width: '100%'
  },
  searchSubtitle: {
    paddingTop: '15px',
    color: '#005995',
    fontSize:'1.2rem'
  },
  descriptionText: {
    color: '#626262',
    marginTop: '50px'
  },
  dataSourceText: {
    color: '#626262',
  },
  introText: {
    padding: '20px',
    color: '#626262',
    fontSize: '1.2rem'
  },
  bannerParent: {
    position: 'relative',
  },
  bannerImg: {
    height: 'auto',
    width: '100%',
    opacity: 0.8,
  },
  searchIcon: {
    fontSize: theme.typography.h4.fontSize,
    width: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoLinks: {
    fontSize:'1.2rem',
    textDecoration: 'underline',
    fontFamily: "\"Arial\", \"Helvetica\", \"Roboto\", sans-serif",
  },
  infoLinkWraper: {
    marginTop: 100,
  },
  spacingClass: {
    padding: '0 15%', //same as input box
  },
  infoLinksParent:{
    justifyContent:'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection:'column',
      justifyContent: 'center',
    },
  },
  leftSpace: {
    paddingLeft: '100px',
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
      paddingTop:'10px',
    },
  },
  autoCompleteResult: {
    marginTop: '-7px',
    margingLeft: '1px'
  },
  suggestBox: {
    zIndex: 1,
    marginTop: theme.spacing.unit,
    zIndex: 1
  },
  searchButton: {
    backgroundColor: '#005995',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#005995',
      color: '#fff',
      opacity: '0.8',
    },
    minHeight: '40px',
    borderRradius: '4px',
    minWwidth: '100px',
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    // boxShadow: theme.shadows[3],
    // '&:hover': {
    //   boxShadow: theme.shadows[5],
    //   backgroundColor: fade(theme.palette.common.white, 0.25)
    // },
    margingTop: '30px',
    width: '100%'
  },
  logoContainer: {
    marginTop: '125px',
    [theme.breakpoints.up('sm')]: {
      minWidth: '500px'
    }
  },
  dataSourceLogo: {
    cursor: 'pointer',
  },
  logo: {
    paddingLeft: '25px',
    paddingRight: '25px',
    marginTop: '18px',
    // minWidth: 100
    // height:'50px',
    marginBottom: '0',
  },
  dataSourcesLogoContainer: {
    marginTop: '125px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  overlayIntro: {
    position: 'absolute',
    top: 0,
    left: '45px',
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      '& h6': {
        maxWidth: '100%'
      }
    }
  },
  dataSources: {
    marginTop: 100
  },

  imgFullHeight: {
    left: 'auto',
    height: 50,
    width: 149,
    position: 'static',
    transform: 'none'
  },
  gridListRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',

    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    scrollBehavior: 'smooth'
  },
  tile: {
    width: 149
  },
  tileTitle: {
    wordBreak: 'break-word',
    overflow: 'unset',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.button.fontSize,
    },
    color: theme.palette.common.black,
    '&:hover': { cursor: 'pointer' }
  },
  tileBar: {
    backgroundColor: '#e0e0e0'
  },
  carouselParent: {
    position: 'relative',
    '& .nav-options': {
      opacity: 0,
      top: 0,
    },
    '&:hover': {
      '& .nav-options': {
        opacity: 1,
        transition: 'opacity 1000ms linear',
      }
    }
  },
  leftNav: {
    position: 'absolute',
    left: 0,
  },
  rightNav: {
    position: 'absolute',
    right: 0,
  },
  partnerInfo: {
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  copyrightText: {
    justifyContent: 'center',
    color: '#626262',
  },
  partnerTextWrapper: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  partnerText: {
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      marginRight: '0',
    },
    color: '#626262',
    paddingTop: '5px',
    // marginLeft:'20px',
    marginRight: '180px',
  },
  footer: {
    borderTop: '1px solid #ddd',
    marginTop: '50px',
    bottom: 0,
    width: '100%',
  }
});

class HomePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props

    const iconScrollerLeft = ({ target }) => {
      const list = document.getElementById('scrollBar').querySelector('ul');
      list.scrollLeft -= 600;
    }

    const iconScrollerRight = ({ target }) => {
      const list = document.getElementById('scrollBar').querySelector('ul');
      list.scrollLeft += 600;
    }

    const responsive = {
      0: {
        items: 1,
      },
      950: {
        items: 2,
      },
      1024: {
        items: 3
      },
      1250: {
        items: 4
      }
    }

    const stagePadding = {
      paddingLeft: 0,     // in pixels
      paddingRight: 0
    }

    const dataSourceLogos = logos.map(logo => (
      <div key={logo.src}>
        {logo.src && <img onClick={() => window.open(logo.href)} alt={logo.name} src={logo.src} className={classes.dataSourceLogo} />}
      </div>
    ))

    const Wrapper = styled.div`
      width: 100%;
      li.alice-carousel__stage-item :not(.__cloned) {
        width: auto !important;
        margin-right: 1rem;
      }
    `;

    return (
      <Grid container className={classes.homeWrapper} >
        <Grid xs={12} item className={classes.bannerParent} >
          <div className={classes.overlayIntro}>
            <Typography className={classes.introText + " " + 'app-intro-text'} align="left" variant="subtitle2" gutterBottom>
              {/* A community encyclopedia linking brain research concepts to data, models, and literature. */}
              KnowledgeSpace is a community-based encyclopedia that links brain research concepts to data, models, and literature. It provides users with access to anatomy, gene expression, models, morphology, and physiology data from over 15 different neuroscience data/model repositories, such as Allen Institute for Brain Science and the Human Brain Project. It is an open project and welcomes participation and contributions from members of the global research community.
            </Typography>
          </div>
          <img src={banner} className={classes.bannerImg} />
        </Grid>
        <Grid container className={classes.searchAreaWrapper} justify="center" alignItems="center" item xs={12}>
          <div className={classes.searchContainer}>
            <Autosuggest classes={classes} history={this.props.history} />
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography className={classes.searchSubtitle} variant="subtitle1" gutterBottom>Over 1678580 pieces of data collected from 14 sources.</Typography>
        </Grid>
        <Grid item xs={12} sm={12} className={classes.infoLinkWraper} >
          <Grid container className={classes.spacingClass + " " +classes.infoLinksParent} direction="row" alignItems='center' >
            <Link className={classes.infoLinks} href="/documentation/#what_is_ks">What is KnowledgeSpace?</Link>
            <Link className={classes.infoLinks + " " + classes.leftSpace} href="/documentation/#how_do_i_navigate">How do I navigate?</Link>
            <Link className={classes.infoLinks + " " + classes.leftSpace} href="/documentation/#what_can_i_find">What can I find?</Link>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sm={12}>
          <Typography className={classes.descriptionText + " " + classes.spacingClass} variant="subtitle1" gutterBottom>KnowledgeSpace is a community-based encyclopedia that links brain research concepts to data, models, and literature. It provides users with access to anatomy, gene expression, models, morphology, and physiology data from over 15 different neuroscience data/model repositories, such as Allen Institute for Brain Science and the Human Brain Project. It is an open project and welcomes participation and contributions from members of the global research community.</Typography>
        </Grid> */}
        <Grid container direction="row" alignItems='center' justify="flex-start" classes={{ container: classes.dataSources }}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.dataSourceText} gutterBottom>Data Sources</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.carouselParent + " " + 'carousel-parent'} direction="row" justify="flex-start">
          <Wrapper>
            <AliceCarousel ref={(el) => (this.Carousel = el)} items={dataSourceLogos} stagePadding={stagePadding} autoPlay buttonsDisabled autoPlayInterval={2500} dotsDisabled responsive={responsive}>

            </AliceCarousel>
            <Fab aria-label="Left" className={classes.fab + " " + classes.leftNav + " " + 'nav-options'} onClick={() => this.Carousel.slidePrev()}>
              <ChevronLeftIcon />
            </Fab>
            <Fab aria-label="ScrollRight" className={classes.fab + " " + classes.rightNav + " " + 'nav-options'} onClick={() => this.Carousel.slideNext()}>
              <ChevronRightIcon />
            </Fab>
          </Wrapper>
        </Grid>

        <Grid item className={classes.footer + " " + 'app-footer'} xs={12}>
          <Grid item xs={12} container direction='column' alignItems='center'>
            <Grid container className={classes.partnerTextWrapper} item xs={12} alignItems="flex-start" justify="flex-end" direction="row">
              <Typography className={classes.partnerText} gutterBottom variant='h6'>In collaboration with</Typography>
            </Grid>
            <Grid item xs={12} className={classes.partnerInfo} container direction="row" alignItems='center'>
              <Grid item >
                <a href='https://humanbrainproject.eu/'>
                  <img alt='HBP' className={classes.logo} src={hbp} />
                </a>
              </Grid>
              <Grid item>
                <a href='https://www.neuinfo.org'>
                  <img alt='NIF' className={classes.logo} src={nif} />
                </a>
              </Grid>
              <Grid item>
                <a href='https://www.incf.org'>
                  <img alt='INCF' className={classes.logo} src={incf} />
                </a>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.copyrightText} container alignItems='center'>
            <Typography className={classes.copyrightText} gutterBottom>Copyright 2020 KnowledgeSpace.org</Typography>
          </Grid>
        </Grid>
      </Grid >
    )
  }
}

const mapStateToProps = ({ entitySearch }) => {
  return { ...entitySearch }
}

export default withStyles(styles)(connect(mapStateToProps)(HomePage))
