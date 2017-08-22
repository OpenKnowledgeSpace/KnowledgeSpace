@extends('layouts.app')

@section('content')
<div class='container' id='search' data-q="{{ $q }}" data-page="{{$page}}"
      data-sort="{{ $sort }}" >
</div>
@endsection
