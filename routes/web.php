<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/About', function () {
    return redirect("/#AboutUs");
});

Route::get('/data_sources', function () {
    return redirect('/#DataSources');
});


Route::get('/documentation', function () {
    return view('home');
})->name('documentation');

Route::get('/atlas', function () {
    return view('home');
})->name('atlas');


Route::get('/wiki/{id}', function ($id) { 
  return view('wiki.show', [ 'curie' => $id ]);
});

Route::get('/literature', function () { 
  return view('literature.show', [ 'curie' => Request::input('curie', ''),
                                   'page' => Request::input('page', 1 )
                                 ]);
});

Route::get('/data_space', function () { 
  return view('data_space.show', [ 'curie' => Request::input('curie', ''),
                                    'data_source' => Request::input('data_source', "" ),
                                    'page' => Request::input('page', 1 ),
                                    'q' => Request::input('q', 0)   
                                ]);
});

Route::get('/search', function() { 
  return view('search.show', [ 'q' => Request::input('q', '0'), 'page' => Request::input('page', 1),
                                'sort' => Request::input('sort', false)  ]);
});

Route::get('/categories', function () {
    return view('categories.show');
})->name('categories');


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
