@extends('layouts.app')

@section('content')

<div class='container page-content'>

	<h1 class='anchor' id='about'>About</h1>
	<section class="row">
  			
				<!-- Welcome Block -->
				<div class="col-md-12">

						<p>KnowledgeSpace (KS) is a community encyclopaedia that links brain research concepts with data, models and literature from around the world. It is an open project and welcomes participation and contributions from members of the global research community.  </p>
            <p>KS is the result of recommendations from a community workshop held by the INCF Program on Ontologies of Neural Structures in 2012 and include the report attached below to community workshop.</p>
            <p><a href="/files/2012_PONS_ws_report.pdf" target="_blank">2012 INCF Workshop Report</a></p>
            <br/>
						<p>KnowledgeSpace has been developed with support from the Human Brain Project through the European Union Seventh Framework Program (FP7/2007-2013) under grant agreement no. 604102 (HBP).</p>
						<br/>
						<p> KS builds on a vocabulary service, populated with an integrated set of neuroscience ontologies with initial content coming from the
                <a href="http://neurolex.org/wiki/Main_Page" target="_blank">Neuroscience Lexicon</a> (NeuroLex), and the <a href="http://brancusi1.usc.edu" target="_blank">Brain Architecture Management System</a> (BAMS). It links to an expanding set of data sources through the Neuroscience Information Framework (NIF) federated search infrastructure.
						</p>
            <p>The current KnowledgeSpace integrated data sources are:</p>
						@include('datasources-list')
                                                
						<p>The current status of KS is in development, with a beta-version launch scheduled for Spring 2016. If you would like to sign up on our mailing list, please <a href="mailto:knowledgespace@incf.org?Subject=About%20KS" target="_top">email us</a>.</p> 
				</div><!--/col-md-12-->
	</section> <!-- About -->

	<h1 class='anchor' id='privacy-policy'>Privacy Policy</h1>
	<section class="row">
		<div class="col-md-12">
			<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
		</div>
	</section>

	<h1 class='anchor' id='terms-of-service'>Terms Of Service</h1>
	<section class="row">
		<div class="col-md-12">
			<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
		</div>
	</section>

</div> <!-- container -->
@endsection
