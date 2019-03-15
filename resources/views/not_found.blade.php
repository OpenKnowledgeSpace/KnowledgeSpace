@extends('layouts.app')

@section('content')
<div class='page-container container' id='not-found'>
<div class="section no-pad-bot blue lighten-4">
  <h1 class="header center">Record Not Found</h1>
  <div class="row center">
    <p class='flow-text'>We're sorry but we cannot find that record.</p>
  </div>
  <div class="row center">
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
@endsection
