<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */
  'scigraph' => [
    'host' => env('SCIGRAPH_HOST'),    
  ],
  'nif' => [
    'host' => env('NIF_HOST'),    
  ],
  
  'data_space' => [
    'host' => env('BIOCADDIE_HOST'),
    'user' => env('BIOCADDIE_USER'),
    'pass' => env('BIOCADDIE_PASS')
  ], 
  'data_space_sources' =>  json_decode( file_get_contents(storage_path().'/json/data_space_sources.json'), true ),
  
  'literature' => [
    'host' => env('LITERATURE_HOST'),    
  ],
  
  'scicrunch' => [
    'host' => env('SCICRUNCH_HOST'),    
    'key' => env('SCICRUNCH_KEY'),    
  ],
  
  'github' => [
    'host' => env('GITHUB_HOST'),    
  ],
  


  'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],

    'ses' => [
        'key' => env('SES_KEY'),
        'secret' => env('SES_SECRET'),
        'region' => 'us-east-1',
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'stripe' => [
        'model' => App\User::class,
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],

];
