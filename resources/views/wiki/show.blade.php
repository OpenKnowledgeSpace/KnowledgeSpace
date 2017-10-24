@extends('layouts.app')

@section('content')

<div class='container' id='terms-detail'>
    <div id='summary-box'  data-curie="{{ $curie }}" ></div>
    @if ( preg_match( "/^MBA\:/", $curie ) ) 
      <div id='atlas-box'   class="row">
        <div class="col m12 s12"> 
          <div class="card">
            <div class="card-content">
              <span class="card-title activator">Atlas</span> 
              <iframe src="http://atlas.brain-map.org/atlas?atlas=1&structure={{ substr($curie, strpos($curie, ":") + 1) }}" width="100%" height="100%"></iframe>
            </div>
          </div> 
        </div>
      </div>
    @endif   
    <div id='literature-box'  data-curie="{{ $curie }}" data-embedded="{{ true }}" data-page=1  ></div>
    <div class='row'> 
      <div id='relationships-box' data-curie="{{ $curie }}" class='' ></div>
      <div id='image-gallery-box' data-curie="{{ $curie }}" class='' ></div>
    </div>
</div>
@endsection
