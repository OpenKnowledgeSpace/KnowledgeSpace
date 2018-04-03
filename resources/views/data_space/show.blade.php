@extends('layouts.app')

@section('content')
<div class='container page-container' >
  <div id='data-space-page' class='' data-source-curie="{{ $source_curie }}" data-term-curies="{{ $term_curies }}"  data-page="{{ $page }}" data-keywords="{{ join( ',', $keywords) }}"  ></div>
</div>
@endsection
