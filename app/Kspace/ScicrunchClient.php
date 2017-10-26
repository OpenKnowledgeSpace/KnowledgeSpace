<?php
  namespace App\Kspace;

  use Elasticsearch\ClientBuilder;

  class ScicrunchClient 
  {
      protected $client;

      public function __construct()
      {
        $this->client =  ClientBuilder::create()->setHosts( 
                          [config('services.scicrunch.host')] 
                         )->build(); 
      }

/* example agg for when that gets fixed.   
            'aggs' => [ 
              "year_facet" => [ 
                'terms' => [ "field" => "dc.publicationDate" ] 
              ] 
            ],
*/ 

      protected function default_params($terms)
      {
        return [  'index' => "*", 
          'type' => 'literature',
          'from' => 0,
          'size' => 20, 
          'custom' => [ 'key' => config('services.scicrunch.key') ], 
          'body' => [ 
            'query' => [ 'match' => [   '_all' => join($terms, '  ') ] ]
          ]
         ]; 
      }
      
      public function search($terms, $params = array( 'size' => 5, 'from' => 0 ) ) 
      {
        $params = array_merge( $this->default_params($terms), $params );
        return $this->client->search($params); 
      }

  }
