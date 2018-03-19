@extends('layouts.app')

@section('content')
<div class='container page-container' >
  <div id='data-space-page' class='' data-curie="{{ $curie }}" data-term-curie="{{ $term_curie }}" data-terms="{{ join(',', $terms) }}"  data-page="{{ $page }}"  ></div>
</div>
@endsection
