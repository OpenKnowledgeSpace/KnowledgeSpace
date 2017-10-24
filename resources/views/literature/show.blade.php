@extends('layouts.app')

@section('content')
<div class='container' id='literature-page' >
  <div id='literature-box' class='' data-curie="{{ $curie }}" data-embedded="{{ false }}" data-page="{{ $page }}"  ></div>
</div>
@endsection
