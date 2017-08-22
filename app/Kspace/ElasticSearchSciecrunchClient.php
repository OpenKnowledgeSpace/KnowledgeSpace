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

      protected function default_params($terms)
      {
        return [  'index' => 'arxiv', 
                  'type' => 'literature', 
                  'client' => [ 'curl' => [ CURLOPT_FOLLOWLOCATION => true ]],
                  'custom' => [ 'key' => config('services.scicrunch.key') ], 
                  'body' => [ 
                    'query' => [ 'match' => [   'terms' => $terms ] ] ]
         ]; 
      }
      
      public function search($terms, $params = array( 'size' => 5, 'from' => 0 ) ) 
      {
        $params = array_merge( $params, $this->default_params($terms) );
        return $this->client->search($params); 
      }

  }
