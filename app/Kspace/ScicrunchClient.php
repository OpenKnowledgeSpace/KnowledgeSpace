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


      protected function default_params($terms, $keywords = '')
      {
        
        $params =  array(  'index' => "*", 
          'type' => 'literature',
          'from' => 0,
          'size' => 20, 
          'custom' => [ 'key' => config('services.scicrunch.key') ], 
          'body' => [ 
            'query' => [ 
              'bool' => [
                'must' => [
                  array_map( function($val) { 
                    return array('match_phrase' => ['_all' => $val ]);
                  }, $terms ),
                  array_map( function($val) { 
                    return array('match' => ['_all' => $val ]);
                  }, $keywords )
                ] 
              ] 
            ],
            'aggs' => [ 'pub_year' => 
              [ 'terms' =>
                [ 'field' => "dc.publicationDate.keyword", 'size' => 10000 ]
              ]
            ]
          ]
        ); 
      
        return $params; 
      }
      
      public function search($terms, $keywords = '', $params = array( 'size' => 5, 'from' => 0 ) ) 
      {
        $params = array_merge( $this->default_params($terms, $keywords), $params );
        return $this->client->search($params); 
      }

  }
