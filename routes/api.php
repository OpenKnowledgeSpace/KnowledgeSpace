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

Route::middleware('api')->get('/dataspace/{source}/info', function(Request $request, $source) {
  $data = array(); 
  foreach ( array_values(config('services.dataspace_sources')) as $category  ) { 
    foreach ( $category as $ds ) {
      if ( $source == $ds["curie"] ) {
        $data = $ds;
        break;      
      } 
    }
  } 
  return response()->json( $data );
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
  $params = $request->input();
  $terms = $params["terms"];
  unset($params["terms"]);
  return response()->json( ScicrunchClient::search($terms, $params) );  
});

Route::middleware('api')->get('/categories/{category}', function(Request $request, $category) {
  $json = json_decode( file_get_contents(storage_path().'/json/category_'.$category.'.json'), true ); 
  return response()->json( $json);  
});
