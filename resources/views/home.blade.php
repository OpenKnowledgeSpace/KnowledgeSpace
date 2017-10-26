@extends('layouts.app')

@section('content')
<div class="container-fluid" id="home-container" >
    
	<div class="parallax-container" id="welcome-banner">
		<div class="section no-pad-bot">
      <div class='container'>
        <br><br>  
			  <div class="row center">
				  <h1 class='header center white-text'>KnowledgeSpace</h1>
			  </div>
        <div class='row center'>
          <h3 class='header col s12 white-text light'>A community encyclopedia linking brain research concepts to data, models, and literature.</h3>
        </div>
        
        <div class='row center'>
				  <div class='col l6 s6 offset-s3 offset-l3 center light'>
					  <form action='/search' method='GET' >
              <div class='search'>
                <div class='search-wrapper'>  
                  <input id='main-page-search' class='form-control input-lg' name='q' placeholder='SEARCH' type='text' >
                  <i class='material-icons'>search</i> 
                </div> 
              </div> 
					  </form>
				  </div>
        </div>  
      
      </div>
     
		</div>
    <div class="parallax"><img src='/imgs/welcome-banner.jpg' alt='home page image' ></div>

  </div> <!-- WELCOME BANNER --> 

  <div class='container'>
		<div class='section'>
			<div class='row' id='showcase'>
				<div class='col s12 m4'>
					<div class='card'>
						<img class='' src="/imgs/ion-channels.jpg" alt="ION CHANNELS" />
						<div class='img-caption btn btn-success'>Ion Channels</div>
						<ul class='center'>
							<li><a href="/wiki/PR:000000705">HCN1</a></li>
							<li><a href="/wiki/PR:000000706">HCN2</a></li>
							<li><a href="/wiki/PR:000000707">HCN3</a></li>
							<li><a href="/wiki/SAO:1700719022">AChR</a></li>
							<li><a href="/wiki/NIFEXT:5242">GABA A</a></li>
							<li><a href="/wiki/NLXMOL:20090505">MGluR2</a></li>
						</ul>	
					</div>
				</div>	
				<div class='col s12 m4'>
					<div class='card'>
						<img class='' src="/imgs/cell-types.jpg" alt="CELL TYPES" />
						<div class='img-caption btn btn-primary blue'>Cell Types</div>
						<ul class='center'>
							<li><a href="/wiki/SAO:862606388">Pyramidal neuron</a></li>
							<li><a href="/wiki/SAO:408819766">Schwann cell</a></li>
							<li><a href="/wiki/NLXCELL:100601">Spiny neuron</a></li>
							<li><a href="/wiki/NIFEXT:55">Neocortex Martinotti cell</a></li>
							<li><a href="/wiki/SAO:666951243">Cerebellum basket cell</a></li>
							<li><br/></li>
						</ul>	
					</div>
				</div>	
				<div class='col s12 m4'>
					<div class='card'>
						<img class='col-md-12' src="/imgs/brain-regions.jpg" alt="BRAIN REGIONS" />
						<div class='img-caption btn btn-info red'>Brain Regions</div>
						<ul class='center'>
							<li><a href="/wiki/UBERON:0001950">Neocortex</a></li>
							<li><a href="/wiki/UBERON:0002435">Striatum</a></li>
							<li><a href="/wiki/UBERON:0009835">Anterior cingulate cortex</a></li>
							<li><a href="/wiki/UBERON:0002037">Cerebellum</a></li>
							<li><a href="/wiki/UBERON:0001897">Thalamus</a></li>
							<li><br/></li>	
						</ul>	
					</div>
				</div>	
			</div>
		</div>
	</div>

	<div class="parallax-container">
		<div class="section no-pad-bot">
   	</div> 
		<div class="parallax"><img src='/imgs/parallax1.jpg' alt='home page image' ></div>
  </div> <!-- WELCOME BANNER --> 
  
	<div class='container homepage-container'>
		<div class='section scrollspy' id='AboutUs'>
			<div class='row'>
				<div class='col s12 center'>
					<h4><i class='material-icons'>bubble_chart</i>About Us</h4>	
					<p class='left-align light'>
						KnowledgeSpace (KS) is a community encyclopaedia that links brain research concepts with data, models and literature from around the world.
						It is an open project and welcomes participation and contributions from members of the global research community. 
						KS is the result of recommendations from a community workshop held by the INCF Program on Ontologies of Neural Structures in 2012 and include the report attached below to community workshop.
            <a href="/files/2012_PONS_ws_report.pdf" target="_blank">2012 INCF Workshop Report</a>
						<br><br>
						KnowledgeSpace has been developed with support from the Human Brain Project through the European Union Seventh Framework Program (FP7/2007-2013) under grant agreement no. 604102 (HBP).
						<br><br>
						KS builds on a vocabulary service, populated with an integrated set of neuroscience ontologies with initial content coming from the <a href="http://neurolex.org/wiki/Main_Page" target="_blank">Neuroscience Lexicon</a> (NeuroLex), and the <a href="http://brancusi1.usc.edu" target="_blank">Brain Architecture Management System</a> (BAMS). It links to an expanding set of data sources through the Neuroscience Information Framework (NIF) federated search infrastructure
					</p>
				</div>
			</div>	
		</div>
	</div>
	
	<div class="parallax-container">
		<div class="section no-pad-bot">
   	</div> 
		<div class="parallax"><img src='/imgs/parallax2.jpg' alt='home page image' ></div>
  </div> <!-- WELCOME BANNER --> 
	
	<div class='container homepage-container'>
		<div class='section scrollspy' id='DataSources'>
			<div class='row'>
				<div class='col s12 center'>
					<h4><i class='material-icons'>collections</i>Data Sources</h4>	
					<ul class=''>
						<li class='btn red lighten-1'><a class='white-text' href="http://neurolex.org/" target="_blank">Neurolex.org</a></li>
						<li class='btn red lighten-1'><a class='white-text' href="http://celltypes.brain-map.org/" target="_blank">Allen Brain Institute cell-types</a></li>
						<li class='btn red lighten-1'><a class='white-text' href="http://bluebrain.epfl.ch/" target="_blank">Blue Brain Project</a></li>
						<li class='btn red lighten-1'><a class='white-text' href="http://neuromorpho.org/" target="_blank">Neuromorpho.org</a></li>
            <li class='btn red lighten-1'><a class='white-text' href="http://neuroelectro.org/" target="_blank">Neuroelectro.org</a></li>
            <li class='btn red lighten-1'><a class='white-text' href="http://www.cellimagelibrary.org/" target="_blank">Cell Image Library</a></li>
            <li class='btn red lighten-1'><a class='white-text' href="http://connectivity-brainer.rhcloud.com/" target="_blank">NIF Integrated Connectivity</a></li>
            <li class='btn red lighten-1'><a class='white-text' href="http://channelpedia.epfl.ch/" target="_blank">Channelpedia.net</a></li>
            <li class='btn red lighten-1'><a class='white-text' href="http://icg.neurotheory.ox.ac.uk" target="_blank">Ion Channel Genealogy</a></li>
            <li class='btn red lighten-1'><a class='white-text' href="http://senselab.med.yale.edu/neurondb" target="_blank">ModelDB</a></li>
            <li class='btn red lighten-1'><a class='white-text' href="http://opensourcebrain.org/" target="_blank">OpenSourceBrain</a></li>
            <li class='btn red lighten-1'><a class='white-text' href="http://www.gensat.org/" target="_blank">GenSat</a></li>
            <li class='btn red lighten-1'><a class='white-text' href="http://www.ncbi.nlm.nih.gov/pubmed" target="_blank">Pubmed</a></li>
					</ul>
				</div>
			</div>	
		</div>
	</div>
	
	<div class="parallax-container">
		<div class="section no-pad-bot">
   	</div> 
		<div class="parallax"><img src='/imgs/parallax3.jpg' alt='home page image' ></div>
  </div> <!-- WELCOME BANNER --> 
  
  <div class='container homepage-container'>
		<div class='section scrollspy' id='Documentation'>
			<div class='row'>
				<div class='col s12 center'>
					<h4><i class='material-icons'>library_books</i>Documentation</h4>	
					<ul class=''>
						<li class='btn blue lighten-1'><a class='white-text' href="https://github.com/NeuroscienceKnowledgeSpace/KnowledgeSpace" target="_blank">KS GitHub Repository</a></li>
						<li class='btn blue lighten-1'><a class='white-text' href="https://github.com/NeuroscienceKnowledgeSpace/ksdesc" target="_blank">KS Description GitHub Repository</a></li>
						<li class='btn blue lighten-1'><a class='white-text' href="https://github.com/SciCrunch/NIF-Ontology" target="_blank">NIF Ontology Repository</a></li>
						<li class='btn blue lighten-1'><a class='white-text' href="https://www.trelliscience.com/#/group-home/504" target="_blank">Working Group Homepage</a></li>
            <li class='btn blue lighten-1'><a class='white-text' href="https://drive.google.com/folderview?id=0B00EreDwaaqZbWJ0c0tRSXZyNWs&usp=sharing" target="_blank">Meeting Minutes</a></li>
					</ul>
				</div>
			</div>	
		</div>
	</div>
  

  <div class="parallax-container">
		<div class="section no-pad-bot">
   	</div> 
		<div class="parallax"><img src='/imgs/welcome-banner.jpg' alt='home page image' ></div>
  </div> <!-- WELCOME BANNER --> 

</div> <!-- HOME CONTAINER --> 
@endsection
