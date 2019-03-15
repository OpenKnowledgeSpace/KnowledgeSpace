@extends('layouts.app')

@section('content')
<script>
  var ENTRY = <?php echo json_encode($entry) ?>;
  var DS_CATEGORIES = <?php echo json_encode($ds_categories) ?>;
</script>
<main> 
  <div class='' id='wiki-page' data-curie="{{ $curie }}"></div>
</main>
@endsection
