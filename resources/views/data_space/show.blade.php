@extends('layouts.app')

@section('content')
<div class='container' id='dataspace-page' >
  <div id='dataspace-page-box' class='' data-curie="{{ $curie }}" data-datasource="{{ $data_source }}"  data-page="{{ $page }}"  ></div>
</div>
@endsection
