<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('api')->get('/terms/{id}', function($id) {
  return response()->json( ScigraphClient::getTerm($id) );  
});

Route::middleware('api')->get('/graph/{id}', function($id) {
  return response()->json( ScigraphClient::getGraph($id) );  
});

Route::middleware('api')->get('/search', function(Request $request) {
  return response()->json( ScigraphClient::search($request->query()));  
});

Route::middleware('api')->get('/dataspace', function() {
  return response()->json(  config('services.dataspace_sources')  );
});

Route::middleware('api')->get('/dataspace/{source}', function(Request $request, $source) {
	$count = ( $request->input('count') ? $request->input('count') : 20 ); 
	$offset = ( $request->input('offset') ? $request->input('offset') : 0 ); 
	$term = ( $request->input('q') ? $request->input('q') : "*" ); 
	$query = [ 'q' => $term, 'count' => $count, 'offset' => $offset ];  
  return response()->json( DataspaceClient::searchInSource($source, $query) );  
});

Route::middleware('api')->get('/dataspace/images/{curie}', function(Request $request, $curie) {
	$count = ( $request->input('count') ? $request->input('count') : 20 ); 
	$offset = ( $request->input('offset') ? $request->input('offset') : 0 ); 
	$query = [ 'q' => $curie, 'count' => $count, 'offset' => $offset ];  
  return response()->json( DataspaceClient::searchImages($query) );  
});


Route::middleware('api')->get('/literature', function(Request $request) {
  
  $params = array();

  $params["rows"] = ( $request->input('rows') ? $request->input('rows') : 20 ); 
	$params["start"] = ( $request->input('start') ? $request->input('start') : 0 ); 
	$params["fl"] = ( $request->input('fl') ? $request->input('fl') : "*" ); 
  
  $terms = ( $request->input('terms') ? $request->input('terms') : [] ); 
  $year = ( $request->input('year') ? $request->input('year') : "*" ); 
  
  return response()->json( ScicrunchClient::searchLatestLiterature($terms, $year, $params) );  
});
