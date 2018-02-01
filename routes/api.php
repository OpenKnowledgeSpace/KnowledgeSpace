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
  return response()->json( ScigraphClient::getTermWithCurie($id) );  
});

Route::middleware('api')->get('/terms/{id}/description', function($id) {
  $response = GithubClient::getDescription($id);
  if ( !$response ) {
    return response()->json(ScigraphClient::getDescriptionWithCurie($id));
  } else { 
    return response()->json($response);  
  } 
});

Route::middleware('api')->get('/graph/{id}', function($id) {
  return response()->json( ScigraphClient::getGraph($id) );  
});

Route::middleware('api')->get('/search', function(Request $request) {
  return response()->json( ScigraphClient::search($request->query()));  
});

Route::middleware('api')->get('/data_space', function() {
  return response()->json(  config('services.data_space_sources')  );
});

Route::middleware('api')->get('/data_space/{sources}', function(Request $request, $sources) {
  $params = $request->input();
  $terms = $params["terms"];
  unset($params["terms"]);
 
  return response()->json( DataSpaceClient::search($sources, $terms, $params) );  
});

Route::middleware('api')->get('/data_space/images/{curie}', function(Request $request, $curie) {
	$count = ( $request->input('count') ? $request->input('count') : 20 ); 
	$offset = ( $request->input('offset') ? $request->input('offset') : 0 ); 
	$query = [ 'q' => $curie, 'count' => $count, 'offset' => $offset ];  
  return response()->json( DataSpaceClient::searchImages($query) );  
});


Route::middleware('api')->get('/literature', function(Request $request) {
  $params = $request->input();
  
  if ( isset($params["terms"]) ) {  
    $terms = $params["terms"];
    unset($params["terms"]);
  } else { $terms = []; }
    
  if ( isset($params["keywords"]) ){  
    $keywords = $params["keywords"];
    unset($params["keywords"]);
  } else { $keywords = []; }

  return response()->json( ScicrunchClient::search($terms, $keywords,  $params) );  
});

Route::middleware('api')->get('/categories/{category}', function(Request $request, $category) {
  $json = json_decode( file_get_contents(storage_path().'/json/category_'.$category.'.json'), true ); 
  return response()->json( $json);  
});
