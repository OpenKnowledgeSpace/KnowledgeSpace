@extends('layouts.app')

@section('content')
<div class='container page-container' >
  <div id='image-gallery-page' class='' data-terms="{{ join(',', $terms) }}" data-embedded="{{ false }}" data-page="{{ $page }}"  ></div>
</div>
@endsection
