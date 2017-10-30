@extends('layouts.app')

@section('content')
<div class='container' >
  <div id='data-space-page' class='' data-curie="{{ $curie }}" data-terms="{{ join(',', $terms) }}"  data-page="{{ $page }}"  ></div>
</div>
@endsection
