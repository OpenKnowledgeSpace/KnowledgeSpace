@extends('layouts.app')

@section('content')

<div class='container' id='terms-detail'>
    <div id='summary-box' data-curie="{{ $curie }}" ></div>
    <div id='relationships-box' data-curie="{{ $curie }}" ></div>
    <div id='image-gallery-box' data-curie="{{ $curie }}" ></div>
   <div id='literature-box' data-curie="{{ $curie }}" ></div>
</div>
@endsection
