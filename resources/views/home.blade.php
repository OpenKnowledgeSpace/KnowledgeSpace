@extends('layouts.app')

@section('content')
<div class="container-fluid" id="home-container" >
    
	<div class="row" id="welcome-banner">
		<div class="container">
			
			<div class="row">
				<h1 class='title-banner'>KnowledgeSpace</h1>
			</div>
          
			<div class='row'>
				<div class='col-md-8 col-md-offset-2'>
					<form action='/search' method='GET' class='form-inline'>
						<div id='home-search'>	
							<div class='input-group col-md-12'>
								<input id='main-page-search' class='form-control input-lg' name='q' placeholder='SEARCH' type='text' >
								<span class="input-group-btn">
									<button class="btn btn-info btn-lg" type="submit">
										<i class='glyphicon glyphicon-search'></i>	
									</button>
								</span>
							</div>
						</div> 
					</form>
				</div>
			</div>
     
		</div>
	</div> <!-- WELCOME BANNER --> 

	
	<div class='row' id='tag-line'>
				<div class='container text-center'>
					<h3><strong>A community encyclopedia linking brain research concepts to data, models, and literature.</strong></h3>
				</div>	
	</div> <!-- TAG LINE --> 

	<div class='row' id='showcase'>
		<ul class='container text-center'>
			<li class='col-md-4 col-sm-6'>
				<div class='row'>
					<img class='' src="/imgs/ion-channels.jpg" alt="ION CHANNELS" />
					<div class='img-caption btn btn-success'>Ion Channels</div>
				</div>
				<div class='row showcase-list'>
					<ul>
						<li><a href="/wiki/PR:000000705">HCN1</a></li>
						<li><a href="/wiki/PR:000000706">HCN2</a></li>
						<li><a href="/wiki/PR:000000707">HCN3</a></li>
						<li><a href="/wiki/NIFMOL:sao1700719022">AChR</a></li>
						<li><a href="/wiki/NIFMOL:nifext_5242">GABA A</a></li>
						<li><a href="/wiki/NIFMOL:nlx_mol_20090505">MGluR2</a></li>
					</ul>	
				</div>	
			</li>
			<li class='col-md-4 col-sm-6'>
				<div class='row'>
					<img class='' src="/imgs/cell-types.jpg" alt="CELL TYPES" />
					<div class='img-caption btn btn-primary'>Cell Types</div>
				</div>
				<div class='row showcase-list'>
					<ul>
						<li><a href="/wiki/NIFCELL:sao862606388">Pyramidal neuron</a></li>
            <li><a href="/wiki/NIFCELL:sao408819766">Schwann cell</a></li>
            <li><a href="/wiki/NIFNEURMOR:nlx_cell_100601">Spiny neuron</a></li>
            <li><a href="/wiki/NIFCELL:nifext_55">Neocortex Martinotti cell</a></li>
            <li><a href="/wiki/NIFCELL:sao666951243">Cerebellum basket cell</a></li>
						<li><br/></li>
					</ul>
				</div>	
			</li>
			<li class='col-md-4 col-sm-6'>
				<div class='row'>
					<img class='col-md-12' src="/imgs/brain-regions.jpg" alt="BRAIN REGIONS" />
					<div class='img-caption btn btn-info'>Brain Regions</div>
				</div>
				<div class='row showcase-list'>
				  <ul>	
						<li><a href="/wiki/UBERON:0001950">Neocortex</a></li>
						<li><a href="/wiki/UBERON:0002435">Striatum</a></li>
						<li><a href="/wiki/UBERON:0009835">Anterior cingulate cortex</a></li>
						<li><a href="/wiki/UBERON:0002037">Cerebellum</a></li>
						<li><a href="/wiki/UBERON:0001897">Thalamus</a></li>
						<li><br/></li>	
					</ul>
				</div>
			</li>
		</ul>
	</div>



<!--
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">
                  <div id='example'></div> 
                </div>
            </div>
-->
</div> <!-- HOME CONTAINER --> 
@endsection
