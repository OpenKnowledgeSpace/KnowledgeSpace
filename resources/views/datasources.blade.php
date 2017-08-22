@extends('layouts.app')

@section('content')

<div class='container page-content'>
  <h1 class='anchor' id='data-sources'>Data Sources</h1>
  <section class="row">
	  @include('datasources-list')
  </section>
</div>
@endsection
